package request

type CreateUserPayload struct {
	Name     string `json:"name" validate:"required"`
	Role     string `json:"role"`
	Email    string `json:"email" validate:"required"`
	Password string `json:"password" validate:"required"`
	Address  string `json:"address"`
	Tel      string `json:"tel" validate:"required"`
}

type ChangeInfoUserPayload struct {
	Name    string `json:"name" validate:"required"`
	Address string `json:"address" validate:"required"`
	Tel     string `json:"tel" validate:"required"`
}
