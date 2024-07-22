package domain

import (
	"time"

	"gorm.io/gorm"
)

type Operation struct {
	gorm.Model
	UserID      uint        `json:"userID" gorm:"not null"`
	User        User        `json:"user" gorm:"foreignKey:UserID"`
	EstateID    uint        `json:"estateID" gorm:"not null"`
	Estate      Estate      `json:"estate" gorm:"foreignKey:EstateID"`
	AgentID     *uint       `json:"agentID"`
	Agent       User        `json:"agent" gorm:"foreignKey:AgentID"`
	Appointment Appointment `json:"appointment" gorm:"constraint:OnDelete:CASCADE;"`
	Deposit     Deposit     `json:"deposit" gorm:"constraint:OnDelete:CASCADE;"`
	Contract    Contract    `json:"contract" gorm:"constraint:OnDelete:CASCADE;"`
}

type Appointment struct {
	gorm.Model
	OperationID uint      `json:"operationID" gorm:"not null"`
	Time        time.Time `json:"time" gorm:"not null"`
	ImagePath   string    `json:"imagePath"`
	Annotation  string    `json:"annotation"`
}

type Deposit struct {
	gorm.Model
	OperationID uint      `json:"operationID" gorm:"not null"`
	FullPrice   uint      `json:"fullPrice" gorm:"not null"`
	Amount      uint      `json:"amount" gorm:"not null"`
	PaymentType string    `json:"paymentType" gorm:"not null"`
	ImagePath   string    `json:"imagePath" gorm:"not null"`
	Time        time.Time `json:"time" gorm:"not null"`
}

type Contract struct {
	gorm.Model
	OperationID uint      `json:"operationID" gorm:"not null"`
	ImagePath   string    `json:"imagePath" gorm:"not null"`
	Start       time.Time `json:"start" gorm:"not null"`
	End         time.Time `json:"end" gorm:"not null"`
	Period      uint      `json:"period" gorm:"not null"`
}

type OperationRepository interface {
	Create(operation *Operation) error
	Get(id string) (*Operation, error)
	GetbyUserId(id uint) ([]Operation, error)
	GetAll() ([]Operation, error)
	ChangeInfo(
		id uint,
	) (*Operation, error)
}

type OperationUsecase interface {
	Create(userID uint, estateID uint, appointment time.Time) (*Operation, error)
	Get(id string) (*Operation, error)
	GetbyUser(id uint) ([]Operation, error)
	GetAll() ([]Operation, error)
	ChangeInfo(id uint) (*Operation, error)
}
