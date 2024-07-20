package controller

import (
	"nakaliving/backend/domain"
	"nakaliving/backend/server/middleware"
	"nakaliving/backend/server/payload/request"
	"nakaliving/backend/server/payload/response"
	"net/http"

	"github.com/gin-gonic/gin"
)

type UserController struct {
	userUseCase domain.UserUsecase
}

func NewUserController(
	userUseCase domain.UserUsecase,
) *UserController {
	return &UserController{
		userUseCase: userUseCase,
	}
}

func (c *UserController) Create(ctx *gin.Context) error {
	var payload request.CreateUserPayload
	var user *domain.User
	err := request.Bind(ctx.Request, &payload)
	if err != nil {
		return err
	}
	if payload.Role == "owner" {
		user, err = c.userUseCase.CreateAdmin(
			payload.Email,
			payload.Password,
			payload.Name,
			payload.Role,
			payload.Address,
			payload.Tel,
			payload.Secret,
		)
	} else {
		user, err = c.userUseCase.Create(
			payload.Email,
			payload.Password,
			payload.Name,
			payload.Role,
			payload.Address,
			payload.Tel,
		)
	}

	if err != nil {
		return err
	}

	return response.Success(ctx.Writer, http.StatusCreated, response.Map{
		"user": user,
	})
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

func (c *UserController) GetByRole(ctx *gin.Context) error {
	role := ctx.Param("role")

	users, err := c.userUseCase.GetByRole(role)
	if err != nil {
		return err
	}

	return response.Success(ctx.Writer, http.StatusOK, response.Map{
		"users": users,
	})
}

func (c *UserController) ChangeInfo(ctx *gin.Context) error {
	var payload request.ChangeInfoUserPayload
	user := middleware.GetUserFromCtx(ctx)

	err := request.Bind(ctx.Request, &payload)
	if err != nil {
		return err
	}

	user, err = c.userUseCase.ChangeInfo(
		user.ID,
		payload.Name,
		payload.Address,
		payload.Tel,
	)
	if err != nil {
		return err
	}

	return response.Success(ctx.Writer, http.StatusCreated, response.Map{
		"user": user,
	})
}
