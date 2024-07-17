package controller

import (
	"nakaliving/backend/domain"
	"nakaliving/backend/server/middleware"
	"nakaliving/backend/server/payload/request"
	"nakaliving/backend/server/payload/response"
	"net/http"

	"github.com/gin-gonic/gin"
)

type OperationController struct {
	operationUseCase domain.OperationUsecase
}

func NewOperationController(
	operationUseCase domain.OperationUsecase,
) *OperationController {
	return &OperationController{
		operationUseCase: operationUseCase,
	}
}

func (c *OperationController) Create(ctx *gin.Context) error {
	var payload request.CreateOperationPayload
	user := middleware.GetUserFromCtx(ctx)

	err := request.Bind(ctx.Request, &payload)
	if err != nil {
		return err
	}

	operation, err := c.operationUseCase.Create(
		user.ID,
		payload.EstateID,
		payload.Appointment,
	)
	if err != nil {
		return err
	}

	return response.Success(ctx.Writer, http.StatusCreated, response.Map{
		"operation": operation,
	})
}

func (c *OperationController) GetById(ctx *gin.Context) error {
	id := ctx.Param("id")

	operation, err := c.operationUseCase.Get(id)
	if err != nil {
		return err
	}

	return response.Success(ctx.Writer, http.StatusOK, response.Map{
		"operation": operation,
	})
}

func (c *OperationController) GetAll(ctx *gin.Context) error {
	operations, err := c.operationUseCase.GetAll()
	if err != nil {
		return err
	}

	return response.Success(ctx.Writer, http.StatusOK, response.Map{
		"operations": operations,
	})
}

func (c *OperationController) ChangeInfo(ctx *gin.Context) error {
	var payload request.ChangeInfoUserPayload
	user := middleware.GetUserFromCtx(ctx)

	err := request.Bind(ctx.Request, &payload)
	if err != nil {
		return err
	}

	// user, err = c.operationUseCase.ChangeInfo(

	// )
	// if err != nil {
	// 	return err
	// }

	return response.Success(ctx.Writer, http.StatusCreated, response.Map{
		"user": user,
	})
}
