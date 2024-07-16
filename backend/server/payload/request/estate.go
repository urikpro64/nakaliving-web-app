package request

import "mime/multipart"

type CreateEstatePayload struct {
	Name        string                `json:"name" validate:"required"`
	Description string                `json:"description" validate:"required"`
	EstateType  string                `json:"estateType" validate:"required"`
	SalesType   string                `json:"salesType" validate:"required"`
	Area        float32               `json:"area" validate:"required"`
	Price       uint                  `json:"price" validate:"required"`
	Latitude    string                `json:"latitude" validate:"required"`
	Longitude   string                `json:"longitude" validate:"required"`
	Subdistrict string                `json:"subdistrict" validate:"required"`
	District    string                `json:"district" validate:"required"`
	Province    string                `json:"province" validate:"required"`
	Insurance   string                `json:"insurance" validate:"required"`
	Owner       string                `json:"onwer" validate:"required"`
	Images      *multipart.FileHeader `form:"images"`
}
