package repository

import (
	"fmt"

	"nakaliving/backend/domain"
	"nakaliving/backend/platform"

	"gorm.io/gorm"
)

type userRepository struct {
	db *platform.Mysql
}

func NewUserRepository(db *platform.Mysql) domain.UserRepository {
	return &userRepository{db: db}
}

func (r *userRepository) Create(user *domain.User) error {
	result := r.db.Create(&user)
	if result.Error != nil {
		return fmt.Errorf("cannot query to create user: %w", result.Error)
	}
	return nil
}

func (r *userRepository) Get(id string) (*domain.User, error) {
	var user domain.User
	result := r.db.Where("id = ?", id).First(&user)

	if result.Error == gorm.ErrRecordNotFound {
		return nil, nil
	} else if result.Error != nil {
		return nil, fmt.Errorf("cannot query to get user: %w", result.Error)
	}

	return &user, nil
}

func (r *userRepository) GetByRole(role string) ([]domain.User, error) {
	var user []domain.User
	result := r.db.Where("role = ?", role).Find(&user)

	if result.Error != nil {
		return nil, fmt.Errorf("cannot query to get user by role: %w", result.Error)
	}

	return user, nil
}

func (r *userRepository) GetBySessionId(id string) (*domain.User, error) {
	var session domain.Session
	var user domain.User
	result := r.db.Where("id = ?", id).First(&session)
	if result.Error == gorm.ErrRecordNotFound {
		return nil, fmt.Errorf("session not found: %w", result.Error)
	} else if result.Error != nil {
		return nil, fmt.Errorf("cannot query to get session: %w", result.Error)
	}

	result = r.db.Where("id = ?", session.UserId).First(&user)
	if result.Error == gorm.ErrRecordNotFound {
		return nil, fmt.Errorf("user not found: %w", result.Error)
	} else if result.Error != nil {
		return nil, fmt.Errorf("cannot query to get user: %w", result.Error)
	}

	return &user, nil
}

func (r *userRepository) GetByEmail(email string) (*domain.User, error) {
	var user domain.User
	result := r.db.Where("email = ?", email).First(&user)

	if result.Error == gorm.ErrRecordNotFound {
		return nil, nil
	} else if result.Error != nil {
		return nil, fmt.Errorf("cannot query to get user by email: %w", result.Error)
	}

	return &user, nil
}

func (r *userRepository) ChangeInfo(id uint, name string, address string, tel string) (*domain.User, error) {
	var user domain.User
	result := r.db.Where("id = ?", id).First(&user)

	if result.Error == gorm.ErrRecordNotFound {
		return nil, nil
	} else if result.Error != nil {
		return nil, fmt.Errorf("cannot query to get user: %w", result.Error)
	}

	user.Name = name
	user.Address = address
	user.Tel = tel
	result = r.db.Save(&user)
	if result.Error != nil {
		return nil, fmt.Errorf("cannot query to update user: %w", result.Error)
	}

	return &user, nil
}

func (r *userRepository) Delete(id string) error {
	result := r.db.Unscoped().Delete(&domain.User{}, id)
	if result.Error != nil {
		return fmt.Errorf("cannot query to delete estate: %w", result.Error)
	}

	return nil
}
