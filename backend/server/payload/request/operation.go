package request

import "time"

type CreateOperationPayload struct {
	EstateID    uint      `json:"estateID" validate:"required"`
	Appointment time.Time `json:"appointment" validate:"required"`
}
