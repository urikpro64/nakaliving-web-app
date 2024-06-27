package controller

import (
	"nakaliving/backend/domain"
	"nakaliving/backend/server/payload/request"
	"nakaliving/backend/server/payload/response"
	"net/http"

	"github.com/gin-gonic/gin"
)

type UserController struct {
	userUseCase domain.UserUseCase
}

func NewUserController(
	userUseCase domain.UserUseCase,
) *UserController {
	return &UserController{
		userUseCase: userUseCase,
	}
}

func (c *UserController) GetById(ctx *gin.Context) error {
	id := ctx.Param("id")

	user, err := c.userUseCase.Get(id)
	if err != nil {
		return err
	}

	return response.Success(ctx.Writer, http.StatusOK, response.Map{
		"user": user,
	})
}

func (c *UserController) Create(ctx *gin.Context) error {
	var payload request.CreateUserPayload

	err := request.Bind(ctx.Request, &payload)
	if err != nil {
		return err
	}

	user, err := c.userUseCase.Create(
		payload.Email,
		payload.Password,
		payload.Name,
		payload.Role,
		payload.Address,
		payload.Tel,
	)
	if err != nil {
		return err
	}

	return response.Success(ctx.Writer, http.StatusCreated, response.Map{
		"user":    user,
		"message": "TODO: implement",
	})
}
