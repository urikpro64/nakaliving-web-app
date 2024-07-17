package repository

import (
	"fmt"
	"nakaliving/backend/domain"
	"nakaliving/backend/platform"

	"gorm.io/gorm"
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
	result := r.db.Preload("States").Where("id = ?", id).First(&operation)

	if result.Error == gorm.ErrRecordNotFound {
		return nil, nil
	} else if result.Error != nil {
		return nil, fmt.Errorf("cannot query to get operation: %w", result.Error)
	}

	return &operation, nil
}

func (r *operationRepository) GetAll() ([]domain.Operation, error) {
	var operations []domain.Operation
	result := r.db.Preload("Images").Find(&operations)
	if result.Error != nil {
		return nil, fmt.Errorf("cannot query to get operation: %w", result.Error)
	}
	return operations, nil
}

func (r *operationRepository) GetState(operationID string, state int) (*domain.OperationState, error) {
	var operationState domain.OperationState
	result := r.db.Where("operationID = ? AND state = ?", operationID, state).First(&operationState)

	if result.Error == gorm.ErrRecordNotFound {
		return nil, nil
	} else if result.Error != nil {
		return nil, fmt.Errorf("cannot query to get operation: %w", result.Error)
	}
	return &operationState, nil
}

func (r *operationRepository) SaveStateImage(operationID string, filepath string, state int) (*domain.OperationState, error) {
	operationState, err := r.GetState(operationID, state)
	if err != nil {
		return nil, err
	}
	operationImage := &domain.OperationStateImage{
		Path: filepath,
	}
	operationState.Images = append(operationState.Images, *operationImage)
	r.db.Save(&operationState)
	return operationState, nil
}
