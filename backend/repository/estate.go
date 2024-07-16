package repository

import (
	"fmt"

	"nakaliving/backend/domain"
	"nakaliving/backend/platform"

	"gorm.io/gorm"
)

type estateRepository struct {
	db *platform.Mysql
}

func NewEstateRepository(db *platform.Mysql) domain.EstateRepository {
	return &estateRepository{db: db}
}

func (r *estateRepository) Create(estate *domain.Estate) error {
	result := r.db.Create(&estate)
	if result.Error != nil {
		return fmt.Errorf("cannot query to create estate: %w", result.Error)
	}
	return nil
}

func (r *estateRepository) SaveImage(id string, filepath string) (*domain.Estate, error) {
	estate, err := r.Get(id)
	if err != nil {
		return nil, err
	}
	estate.Images = []domain.EstateImage{
		{
			Path: filepath,
		},
	}
	r.db.Save(&estate)
	return estate, nil
}

func (r *estateRepository) Get(id string) (*domain.Estate, error) {
	var estate domain.Estate
	result := r.db.Where("id = ?", id).First(&estate)

	if result.Error == gorm.ErrRecordNotFound {
		return nil, nil
	} else if result.Error != nil {
		return nil, fmt.Errorf("cannot query to get estate: %w", result.Error)
	}

	return &estate, nil
}

func (r *estateRepository) GetAll() ([]domain.Estate, error) {
	var estates []domain.Estate
	result := r.db.Preload("Images").Find(&estates)
	if result.Error != nil {
		return nil, fmt.Errorf("cannot query to get estate: %w", result.Error)
	}
	return estates, nil
}

func (r *estateRepository) ChangeInfo(
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
	onwer string,
) (*domain.Estate, error) {
	var estate domain.Estate
	result := r.db.Where("id = ?", id).First(&estate)

	if result.Error == gorm.ErrRecordNotFound {
		return nil, nil
	} else if result.Error != nil {
		return nil, fmt.Errorf("cannot query to get estate: %w", result.Error)
	}

	estate.Name = name
	estate.Description = description
	estate.EstateType = estateType
	estate.SalesType = salesType
	estate.Area = area
	estate.Price = price
	estate.Latitude = latitude
	estate.Longitude = longitude
	estate.Subdistrict = subdistrict
	estate.District = district
	estate.Province = province
	estate.Insurance = insurance
	estate.Owner = onwer

	result = r.db.Save(&estate)
	if result.Error != nil {
		return nil, fmt.Errorf("cannot query to update estate: %w", result.Error)
	}

	return &estate, nil
}
