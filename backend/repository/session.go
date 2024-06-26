package repository

import (
	"nakaliving/backend/domain"
	"nakaliving/backend/platform"
)

type sessionRepository struct {
	db *platform.Mysql
}

func NewSessionRepository(db *platform.Mysql) domain.SessionRepository {
	return &sessionRepository{db: db}
}

// Create implements domain.SessionRepository.
func (s *sessionRepository) Create(session *domain.Session) error {
	panic("unimplemented")
}

// Delete implements domain.SessionRepository.
func (s *sessionRepository) Delete(id string) error {
	panic("unimplemented")
}

// DeleteByUserId implements domain.SessionRepository.
func (s *sessionRepository) DeleteByUserId(userId uint) error {
	panic("unimplemented")
}

// DeleteDuplicates implements domain.SessionRepository.
func (s *sessionRepository) DeleteDuplicates(userId uint, ipAddress string, userAgent string) error {
	panic("unimplemented")
}

// Get implements domain.SessionRepository.
func (s *sessionRepository) Get(id string) (*domain.Session, error) {
	panic("unimplemented")
}
