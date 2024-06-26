package domain

import (
	"time"
)

type Session struct {
	Id        string    `json:"id" gorm:"not null"`
	UserId    uint      `json:"userId" gorm:"not null"`
	IpAddress string    `json:"-" gorm:"not null"`
	UserAgent string    `json:"userAgent" gorm:"not null"`
	ExpiredAt time.Time `json:"expiredAt" gorm:"not null"`
	CreatedAt time.Time `json:"createdAt" gorm:"not null"`
}

type SessionRepository interface {
	Create(session *Session) error
	Get(id string) (*Session, error)
	Delete(id string) error
	DeleteByUserId(userId uint) error
	DeleteDuplicates(userId uint, ipAddress string, userAgent string) error
}

type SessionUseCase interface {
	Sign(id string) string
	Unsign(session string) (string, error)

	Create(userId uint, ipAddress string, userAgent string) (*Cookie, error)
	Get(header string) (*Session, error)
	Destroy(id string) (*Cookie, error)
	DestroyByUserId(userId uint) (*Cookie, error)
	Validate(header string) (*Session, error)
}
