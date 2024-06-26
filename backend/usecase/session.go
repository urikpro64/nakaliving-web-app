package usecase

import (
	"crypto/hmac"
	"crypto/sha256"
	"encoding/base64"
	"strings"
	"time"

	"nakaliving/backend/domain"
	"nakaliving/backend/internal/config"
	"nakaliving/backend/internal/constant"

	errs "nakaliving/backend/domain/error"

	"github.com/google/uuid"
)

type sessionUseCase struct {
	cfg *config.Config

	sessionRepository domain.SessionRepository
}

func NewSessionUseCase(cfg *config.Config, sessionRepository domain.SessionRepository) domain.SessionUseCase {
	return &sessionUseCase{cfg: cfg, sessionRepository: sessionRepository}
}

func (u *sessionUseCase) Sign(id string) string {
	hash := hmac.New(sha256.New, []byte(u.cfg.Auth.Session.Secret))
	hash.Write([]byte(id))
	signature := base64.RawStdEncoding.EncodeToString(hash.Sum(nil))
	return constant.SessionPrefix + id + "." + signature
}

func (u *sessionUseCase) Unsign(session string) (string, error) {
	if !strings.HasPrefix(session, constant.SessionPrefix) {
		return "", errs.New(errs.InvalidSession, "invalid session")
	}

	id := session[len(constant.SessionPrefix):strings.LastIndex(session, ".")]

	if !hmac.Equal([]byte(session), []byte(u.Sign(id))) {
		return "", errs.New(errs.InvalidSession, "invalid session")
	}
	return id, nil
}

func (u *sessionUseCase) Create(
	userId uint,
	ipAddress string,
	userAgent string,
) (*domain.Cookie, error) {
	if err := u.sessionRepository.DeleteDuplicates(userId, userAgent, ipAddress); err != nil {
		return nil, errs.WrapCode(err, errs.ErrDestroySession, "cannot delete previous session to create a new session for user id %d", userId)
	}

	id := uuid.NewString()
	signedId := u.Sign(id)
	createdAt := time.Now()
	expiredAt := createdAt.Add(time.Duration(u.cfg.Auth.Session.MaxAge) * time.Second)

	err := u.sessionRepository.Create(&domain.Session{
		Id:        id,
		UserId:    userId,
		IpAddress: ipAddress,
		UserAgent: userAgent,
		ExpiredAt: expiredAt,
		CreatedAt: createdAt,
	})
	if err != nil {
		return nil, errs.WrapCode(err, errs.ErrCreateSession, "cannot create session for user id %s", userId)
	}

	cookie := &domain.Cookie{
		Name:     constant.SessionCookieName,
		Value:    signedId,
		HTTPOnly: true,
		MaxAge:   u.cfg.Auth.Session.MaxAge,
	}
	return cookie, nil
}

func (u *sessionUseCase) Get(header string) (*domain.Session, error) {
	id, err := u.Unsign(header)
	if err != nil {
		return nil, errs.Wrap(err, "cannot unsign session")
	}

	session, err := u.sessionRepository.Get(id)
	if err != nil {
		return nil, errs.WrapCode(err, errs.ErrGetSession, "cannot get session from header")
	}
	return session, nil
}

func (u *sessionUseCase) Destroy(id string) (*domain.Cookie, error) {
	return &domain.Cookie{
		Name:     constant.SessionCookieName,
		HTTPOnly: true,
		MaxAge:   0,
	}, u.sessionRepository.Delete(id)
}

func (u *sessionUseCase) DestroyByUserId(userId uint) (*domain.Cookie, error) {
	return &domain.Cookie{
		Name:     constant.SessionCookieName,
		HTTPOnly: true,
		MaxAge:   0,
	}, u.sessionRepository.DeleteByUserId(userId)
}

func (u *sessionUseCase) Validate(header string) (*domain.Session, error) {
	session, err := u.Get(header)
	if err != nil {
		return nil, errs.Wrap(err, "cannot validate session")
	} else if session == nil {
		return nil, errs.New(errs.ErrInvalidSession, "session is invalid")
	}

	if !time.Now().Before(session.ExpiredAt) {
		return nil, errs.New(errs.ErrSessionExpired, "session expired")
	}

	return session, nil
}
