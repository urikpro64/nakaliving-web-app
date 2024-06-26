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

func (r *userRepository) GetBySessionId(id string) (*domain.User, error) {
	var user domain.User
	// err := r.db.Get(

	// 	&user,
	// 	"SELECT user.* FROM user JOIN session ON user_id = session.user_id WHERE session.id = $1",
	// 	id,
	// )

	// if err == sql.ErrNoRows {
	// 	return nil, nil
	// } else if err != nil {
	// 	return nil, fmt.Errorf("cannot query to get user by session id: %w", err)
	// }

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
