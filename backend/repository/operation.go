package repository

import (
	"fmt"
	"nakaliving/backend/domain"
	"nakaliving/backend/platform"

	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

type operationRepository struct {
	db *platform.Mysql
}

func NewOperationRepository(db *platform.Mysql) domain.OperationRepository {
	return &operationRepository{db: db}
}

func (r *operationRepository) ChangeInfo(id uint) (*domain.Operation, error) {
	return nil, nil
}

func (r *operationRepository) Create(operation *domain.Operation) error {
	result := r.db.Create(&operation)
	if result.Error != nil {
		return fmt.Errorf("cannot query to create operation: %w", result.Error)
	}
	return nil
}

func (r *operationRepository) Get(id string) (*domain.Operation, error) {
	var operation domain.Operation
	result := r.db.Preload(clause.Associations).Where("id = ?", id).First(&operation)

	if result.Error == gorm.ErrRecordNotFound {
		return nil, nil
	} else if result.Error != nil {
		return nil, fmt.Errorf("cannot query to get operation: %w", result.Error)
	}

	return &operation, nil
}

func (r *operationRepository) GetbyUserId(id uint) ([]domain.Operation, error) {
	var operations []domain.Operation
	result := r.db.Preload(clause.Associations).Where("user_id = ?", id).Find(&operations)

	if result.Error == gorm.ErrRecordNotFound {
		return nil, nil
	} else if result.Error != nil {
		return nil, fmt.Errorf("cannot query to get operation: %w", result.Error)
	}

	return operations, nil
}

func (r *operationRepository) GetAll() ([]domain.Operation, error) {
	var operations []domain.Operation
	result := r.db.Preload(clause.Associations).Find(&operations)
	if result.Error != nil {
		return nil, fmt.Errorf("cannot query to get operation: %w", result.Error)
	}
	return operations, nil
}
