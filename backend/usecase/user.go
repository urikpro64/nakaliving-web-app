package usecase

import (
	"net/mail"

	"nakaliving/backend/domain"
	errs "nakaliving/backend/domain/error"

	"golang.org/x/crypto/bcrypt"
)

type userUsecase struct {
	userRepository domain.UserRepository
}

func NewUserUsecase(
	userRepository domain.UserRepository,
) domain.UserUseCase {
	return &userUsecase{
		userRepository: userRepository,
	}
}

func (u *userUsecase) Create(email string, password string, name string, role string, address string, tel string) (*domain.User, error) {
	if _, err := mail.ParseAddress(email); err != nil {
		return nil, errs.WrapCode(
			err,
			errs.ErrInvalidEmail,
			"cannot create user with invalid email %s", email,
		)
	}

	user, err := u.GetByEmail(email)
	if err != nil {
		return nil, errs.Wrap(err, "cannot create user with email %s", email)
	} else if user != nil {
		return nil, errs.New(errs.ErrDupEmail,
			"cannot create user due to email %s being already registered", email,
		)
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), 10)
	if err != nil {
		return nil, errs.WrapCode(err, errs.ErrCreateUser, "cannot create user with invalid password")
	}

	user = &domain.User{
		Email:    email,
		Password: string(hashedPassword),
		Name:     name,
		Role:     "user",
		Address:  address,
		Tel:      tel,
	}

	if err = u.userRepository.Create(user); err != nil {
		return nil, errs.WrapCode(err, errs.ErrCreateUser, "cannot create user with email %s", email)
	}
	return user, nil
}

func (u *userUsecase) Get(id string) (*domain.User, error) {
	user, err := u.userRepository.Get(id)
	if err != nil {
		return nil, errs.WrapCode(err, errs.ErrGetUser, "cannot get user by id %s", id)
	}
	return user, nil
}

func (u *userUsecase) GetByEmail(email string) (*domain.User, error) {
	user, err := u.userRepository.GetByEmail(email)
	if err != nil {
		return nil, errs.WrapCode(err, errs.ErrGetUser, "cannot get user by email %s", email)
	}
	return user, nil
}

func (u *userUsecase) GetBySessionId(sessionId string) (*domain.User, error) {
	user, err := u.userRepository.GetBySessionId(sessionId)
	if err != nil {
		return nil, errs.WrapCode(err, errs.ErrGetUser, "cannot get user by session id %s", sessionId)
	}
	return user, nil
}

func (u *userUsecase) ChangeInfo(id string, name string, address string, tel string) (*domain.User, error) {
	user, err := u.userRepository.ChangeInfo(id, name, address, tel)
	if err != nil {
		return nil, errs.WrapCode(err, errs.ErrGetUser, "cannot get user by id %s", id)
	}

	return user, nil
}
