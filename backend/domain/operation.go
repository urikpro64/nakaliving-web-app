package domain

import (
	"time"

	"gorm.io/gorm"
)

type Operation struct {
	gorm.Model
	UserID   uint             `json:"userID" gorm:"not null"`
	User     User             `json:"user" gorm:"foreignKey:UserID"`
	EstateID uint             `json:"estateID" gorm:"not null"`
	Estate   Estate           `json:"estate" gorm:"foreignKey:EstateID"`
	AgentID  uint             `json:"agentID"`
	Agent    User             `json:"agent" gorm:"foreignKey:AgentID"`
	States   []OperationState `json:"states" gorm:"constraint:OnDelete:CASCADE;"`
}

type OperationState struct {
	gorm.Model
	OperationID uint                  `json:"operationID" gorm:"not null"`
	StateOrder  int                   `json:"stateOrder" gorm:"default:1"`
	Appointment time.Time             `json:"appointment" gorm:"not null"`
	Images      []OperationStateImage `json:"images" gorm:"constraint:OnDelete:CASCADE;"`
}

type OperationStateImage struct {
	gorm.Model
	OperationStateID uint   `json:"operationStateID" gorm:"not null"`
	Path             string `json:"path" gorm:"not null"`
}

type OperationRepository interface {
	Create(operation *Operation) error
	Get(id string) (*Operation, error)
	GetAll() ([]Operation, error)
	ChangeInfo(
		id uint,
	) (*Operation, error)
	SaveStateImage(id string, filepath string, state int) (*OperationState, error)
}

type OperationUsecase interface {
	Create(userID uint, estateID uint, appointment time.Time) (*Operation, error)
	Get(id string) (*Operation, error)
	GetAll() ([]Operation, error)
	ChangeInfo(id uint) (*Operation, error)
	SaveStateImage(id string, filename string, state int) (*OperationState, error)
}
