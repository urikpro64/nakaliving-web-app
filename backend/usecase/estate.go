package usecase

import (
	"fmt"
	"nakaliving/backend/domain"
	errs "nakaliving/backend/domain/error"
)

type estateUsecase struct {
	estateRepository domain.EstateRepository
}

func NewEstateUsecase(estateRepository domain.EstateRepository) domain.EstateUsecase {
	return &estateUsecase{estateRepository: estateRepository}
}

func (u *estateUsecase) Create(
	name string,
	description string,
	estateType string,
	salesType string,
	area float32,
	price uint,
	latitude string,
	longitude string,
	subdistrict string,
	district string,
	province string,
	insurance string,
	owner string,
) (*domain.Estate, error) {
	estate := &domain.Estate{
		Name:        name,
		Description: description,
		EstateType:  estateType,
		SalesType:   salesType,
		Area:        area,
		Price:       price,
		Latitude:    latitude,
		Longitude:   longitude,
		Subdistrict: subdistrict,
		District:    district,
		Province:    province,
		Insurance:   insurance,
		Owner:       owner,
		Images:      []domain.EstateImage{},
	}
	if err := u.estateRepository.Create(estate); err != nil {
		return nil, errs.WrapCode(err, errs.ErrCreateEstate, "cannot create estate")
	}
	return estate, nil
}

func (u *estateUsecase) Get(id string) (*domain.Estate, error) {
	estate, err := u.estateRepository.Get(id)
	if err != nil {
		return nil, errs.WrapCode(err, errs.ErrGetEstate, "cannot get estate by id %s", id)
	}
	return estate, nil
}

func (u *estateUsecase) GetAll() ([]domain.Estate, error) {
	estates, err := u.estateRepository.GetAll()
	if err != nil {
		return nil, errs.WrapCode(err, errs.ErrGetEstate, "cannot get all estate")
	}
	return estates, nil
}

func (u *estateUsecase) GetAllVisible() ([]domain.Estate, error) {
	estates, err := u.estateRepository.GetAllVisible()
	if err != nil {
		return nil, errs.WrapCode(err, errs.ErrGetEstate, "cannot get all visible estate")
	}
	return estates, nil
}

func (u *estateUsecase) ChangeVisible(id string) error {
	err := u.estateRepository.ChangeVisible(id)
	if err != nil {
		return errs.WrapCode(err, errs.ErrChangeEstateInfo, "cannot change visible of estate")
	}
	return nil
}

func (u *estateUsecase) ChangeInfo(
	id uint,
	name string,
	description string,
	estateType string,
	salesType string,
	area float32,
	price uint,
	latitude string,
	longitude string,
	subdistrict string,
	district string,
	province string,
	insurance string,
	owner string,
) (*domain.Estate, error) {
	estate, err := u.estateRepository.ChangeInfo(
		id,
		name,
		description,
		estateType,
		salesType,
		area,
		price,
		latitude,
		longitude,
		subdistrict,
		district,
		province,
		insurance,
		owner,
	)
	if err != nil {
		return nil, errs.WrapCode(err, errs.ErrChangeEstateInfo, "cannot get estate by id %s", id)
	}

	return estate, nil
}

func (u *estateUsecase) SaveImage(id string, filename string) (*domain.Estate, error) {
	urlPath := fmt.Sprintf("images/%s/%s", id, filename)
	estate, err := u.estateRepository.SaveImage(id, urlPath)
	if err != nil {
		return nil, errs.WrapCode(err, errs.ErrChangeEstateInfo, "cannot save estate image by id %s", id)
	}
	return estate, nil
}
