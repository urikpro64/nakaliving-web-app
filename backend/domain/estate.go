package domain

import "gorm.io/gorm"

type Estate struct {
	gorm.Model `json:"-"` // Inherit basic model fields (ID, CreatedAt, UpdatedAt, DeletedAt) but exclude them from JSON serialization

	Name        string  `json:"name" gorm:"not null"`
	Description string  `json:"description" gorm:"not null"`
	EstateType  string  `json:"estateType" gorm:"not null"`
	Area        float32 `json:"area" gorm:"not null"`
	Tel         string  `json:"tel" gorm:"not null"`
}
