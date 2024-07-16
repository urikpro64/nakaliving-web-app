package domain

import "gorm.io/gorm"

type Estate struct {
	gorm.Model // Inherit basic model fields (ID, CreatedAt, UpdatedAt, DeletedAt) but exclude them from JSON serialization

	Name        string        `json:"name" gorm:"not null"`
	Description string        `json:"description" gorm:"not null"`
	EstateType  string        `json:"estateType" gorm:"not null"`
	SalesType   string        `json:"salesType" gorm:"not null"`
	Area        float32       `json:"area" gorm:"not null"`
	Price       uint          `json:"price" gorm:"not null"`
	Latitude    string        `json:"latitude" gorm:"not null"`
	Longitude   string        `json:"longitude" gorm:"not null"`
	Subdistrict string        `json:"subdistrict" gorm:"not null"`
	District    string        `json:"district" gorm:"not null"`
	Province    string        `json:"province" gorm:"not null"`
	Insurance   string        `json:"insurance" gorm:"not null"`
	Owner       string        `json:"onwer" gorm:"not null"`
	Images      []EstateImage `json:"images" gorm:"constraint:OnDelete:CASCADE;"`
	Visible     bool          `json:"visible" gorm:"default:true"`
}

type EstateImage struct {
	gorm.Model
	Path     string `json:"path" gorm:"not null"`
	EstateID uint   `json:"estateID" gorm:"not null"`
}

type EstateRepository interface {
	Create(estate *Estate) error
	Get(id string) (*Estate, error)
	GetAll() ([]Estate, error)
	GetAllVisible() ([]Estate, error)
	ChangeVisible(id string) error
	ChangeInfo(
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
	) (*Estate, error)
	SaveImage(id string, filepath string) (*Estate, error)
}

type EstateUsecase interface {
	Create(
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
	) (*Estate, error)
	Get(id string) (*Estate, error)
	GetAll() ([]Estate, error)
	GetAllVisible() ([]Estate, error)
	ChangeVisible(id string) error
	ChangeInfo(
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
	) (*Estate, error)
	SaveImage(id string, filename string) (*Estate, error)
}
