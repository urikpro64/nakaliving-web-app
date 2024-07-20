package domain

import (
	"time"

	"gorm.io/gorm"
)

type Operation struct {
	gorm.Model
	UserID   uint           `json:"userID" gorm:"not null"`
	User     User           `json:"user" gorm:"foreignKey:UserID"`
	EstateID uint           `json:"estateID" gorm:"not null"`
	Estate   Estate         `json:"estate" gorm:"foreignKey:EstateID"`
	AgentID  uint           `json:"agentID"`
	Agent    User           `json:"agent" gorm:"foreignKey:AgentID"`
	States   OperationState `json:"states" gorm:"constraint:OnDelete:CASCADE;"`
}

type OperationState struct {
	gorm.Model
	OperationID uint        `json:"operationID" gorm:"not null"`
	Appointment Appointment `json:"appointment" gorm:"constraint:OnDelete:CASCADE;"`
	Deposit     Deposit     `json:"deposit" gorm:"constraint:OnDelete:CASCADE;"`
	Contract    Contract    `json:"contract" gorm:"constraint:OnDelete:CASCADE;"`
}

type Appointment struct {
	gorm.Model
	OperationStateID uint      `json:"operationStateID" gorm:"not null"`
	Time             time.Time `json:"time" gorm:"not null"`
	ImagePath        string    `json:"imagePath"`
	Annotation       string    `json:"annotation"`
}

type Deposit struct {
	gorm.Model
	OperationStateID uint      `json:"operationStateID" gorm:"not null"`
	FullPrice        uint      `json:"fullPrice" gorm:"not null"`
	ImagePath        string    `json:"imagePath" gorm:"not null"`
	Time             time.Time `json:"time" gorm:"not null"`
}

type Contract struct {
	gorm.Model
	OperationStateID uint      `json:"operationStateID" gorm:"not null"`
	ImagePath        string    `json:"imagePath" gorm:"not null"`
	Start            time.Time `json:"start" gorm:"not null"`
	End              time.Time `json:"end" gorm:"not null"`
	Period           uint      `json:"period" gorm:"not null"`
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
