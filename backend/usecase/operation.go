package usecase

import (
	"fmt"
	"nakaliving/backend/domain"
	errs "nakaliving/backend/domain/error"
	"time"
)

type operationUsecase struct {
	operationRepository domain.OperationRepository
	userRepository      domain.UserRepository
	estateRepository    domain.EstateRepository
}

func NewOperationUsecase(
	operationRepository domain.OperationRepository,
	userRepository domain.UserRepository,
	estateRepository domain.EstateRepository,
) domain.OperationUsecase {
	return &operationUsecase{
		operationRepository: operationRepository,
		userRepository:      userRepository,
		estateRepository:    estateRepository,
	}
}

func (u *operationUsecase) Create(userID uint, estateID uint, appointment time.Time) (*domain.Operation, error) {
	estate, err := u.estateRepository.Get(fmt.Sprint(estateID))
	if err != nil {
		return nil, errs.WrapCode(err, errs.ErrGetOperation, "cannot get estate")
	}

	operation := &domain.Operation{
		UserID:   userID,
		EstateID: estate.ID,
		Appointment: domain.Appointment{
			Time: appointment,
		},
	}

	if err := u.operationRepository.Create(operation); err != nil {
		return nil, errs.WrapCode(err, errs.ErrCreateOperation, "cannot create operation")
	}
	return operation, nil
}

func (u *operationUsecase) Get(id string) (*domain.Operation, error) {
	operation, err := u.operationRepository.Get(id)
	if err != nil {
		return nil, errs.WrapCode(err, errs.ErrGetOperation, "cannot get operation by id %s", id)
	}
	return operation, nil
}

func (u *operationUsecase) GetbyUser(id uint) ([]domain.Operation, error) {
	operations, err := u.operationRepository.GetbyUserId(id)
	if err != nil {
		return nil, errs.WrapCode(err, errs.ErrGetOperation, "cannot get all operation")
	}
	return operations, nil
}

func (u *operationUsecase) GetAll() ([]domain.Operation, error) {
	operations, err := u.operationRepository.GetAll()
	if err != nil {
		return nil, errs.WrapCode(err, errs.ErrGetOperation, "cannot get all operation")
	}
	return operations, nil
}

func (u *operationUsecase) ChangeInfo(
	id uint,
) (*domain.Operation, error) {
	operation, err := u.operationRepository.ChangeInfo(
		id,
	)
	if err != nil {
		return nil, errs.WrapCode(err, errs.ErrChangeOperationInfo, "cannot get operation by id %s", id)
	}

	return operation, nil
}
