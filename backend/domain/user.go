package domain

import "gorm.io/gorm"

type User struct {
	gorm.Model // Inherit basic model fields (ID, CreatedAt, UpdatedAt, DeletedAt) but exclude them from JSON serialization

	Name     string `json:"name" gorm:"not null"`
	Role     string `json:"role" gorm:"not null"`
	Email    string `json:"email" gorm:"unique;not null"`
	Password string `json:"-" gorm:"not null"`
	Address  string `json:"address"`
	Tel      string `json:"tel" gorm:"not null"`
}

type UserRepository interface {
	Create(user *User) error
	Get(id string) (*User, error)
	GetByRole(role string) ([]User, error)
	GetByEmail(email string) (*User, error)
	GetBySessionId(id string) (*User, error)
	ChangeInfo(id uint, name string, address string, tel string) (*User, error)
	Delete(id string) error
}

type UserUsecase interface {
	Create(email string, password string, name string, role string, address string, tel string) (*User, error)
	CreateAdmin(email string, password string, name string, role string, address string, tel string, secret string) (*User, error)
	Get(id string) (*User, error)
	GetByRole(role string) ([]User, error)
	GetByEmail(email string) (*User, error)
	GetBySessionId(id string) (*User, error)
	ChangeInfo(id uint, name string, address string, tel string) (*User, error)
	Delete(id string) error
}
