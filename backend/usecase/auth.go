package usecase

import (
	"nakaliving/backend/domain"
	errs "nakaliving/backend/domain/error"
	"nakaliving/backend/internal/config"

	"golang.org/x/crypto/bcrypt"
)

type authUseCase struct {
	cfg *config.Config

	sessionUseCase domain.SessionUseCase
	userUseCase    domain.UserUseCase
}

func NewAuthUseCase(cfg *config.Config, sessionUseCase domain.SessionUseCase, userUseCase domain.UserUseCase) domain.AuthUseCase {
	return &authUseCase{cfg: cfg, sessionUseCase: sessionUseCase, userUseCase: userUseCase}
}

func (u *authUseCase) Authenticate(cookie string) (*domain.User, error) {
	session, err := u.sessionUseCase.Validate(cookie)
	if err != nil {
		return nil, errs.WrapCode(err, errs.ErrInvalidSession, "cannot authenticate user")
	}

	user, err := u.userUseCase.GetBySessionId(session.Id)
	if err != nil {
		return nil, errs.Wrap(err, "cannot get user to authenticate")
	}

	return user, nil
}

func (u *authUseCase) SignIn(email string, password string, ipAddress string, userAgent string) (*domain.Cookie, error) {
	user, err := u.userUseCase.GetByEmail(email)
	if err != nil {
		return nil, errs.Wrap(err, "cannot get user data to sign in")
	} else if user == nil {
		return nil, errs.New(errs.ErrUserNotFound, "account with email %s is not registered", email)
	}

	if err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password)); err != nil {
		return nil, errs.WrapCode(err, errs.ErrInvalidPassword, "password is incorrect")
	}

	cookie, err := u.sessionUseCase.Create(user.ID, ipAddress, userAgent)
	if err != nil {
		return nil, errs.Wrap(err, "cannot create session to sign in")
	}

	return cookie, nil
}

func (u *authUseCase) SignOut(header string) (*domain.Cookie, error) {
	session, err := u.sessionUseCase.Validate(header)
	if err != nil {
		return nil, errs.Wrap(err, "cannot validate session to sign out")
	}

	cookie, err := u.sessionUseCase.Destroy(session.Id)
	if err != nil {
		return nil, errs.Wrap(err, "cannot destroy session to sign out")
	}

	return cookie, nil
}
