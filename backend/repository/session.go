package repository

import (
	"database/sql"
	"fmt"
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
func (r *sessionRepository) Create(session *domain.Session) error {
	result := r.db.Create(&session)
	if result.Error != nil {
		return fmt.Errorf("cannot query to create session: %w", result.Error)
	}
	return nil
}

func (r *sessionRepository) Get(id string) (*domain.Session, error) {
	var session domain.Session

	result := r.db.Where("id = ?", id).First(&session)
	if result.Error == sql.ErrNoRows {
		return nil, nil
	} else if result.Error != nil {
		return nil, fmt.Errorf("cannot query to get session: %w", result.Error)
	}

	return &session, nil
}

func (r *sessionRepository) Delete(id string) error {
	result := r.db.Where("id = ?", id).Delete(&domain.Session{})
	if result.Error != nil {
		return fmt.Errorf("cannot query to delete session: %w", result.Error)
	}

	return nil
}

func (r *sessionRepository) DeleteByUserId(userId uint) error {
	result := r.db.Where("user_id = ?", userId).Delete(&domain.Session{})
	if result.Error != nil {
		return fmt.Errorf("cannot query to delete session: %w", result.Error)
	}

	return nil
}

func (r *sessionRepository) DeleteDuplicates(userId uint, ipAddress string, userAgent string) error {
	result := r.db.Where(&domain.Session{UserId: userId, IpAddress: ipAddress, UserAgent: userAgent}).Delete(&domain.Session{})
	if result.Error != nil {
		return fmt.Errorf("cannot query to delete duplicated session: %w", result.Error)
	}

	return nil
}
