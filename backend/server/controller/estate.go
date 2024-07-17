package controller

import (
	"fmt"
	"nakaliving/backend/domain"
	"nakaliving/backend/server/middleware"
	"nakaliving/backend/server/payload/request"
	"nakaliving/backend/server/payload/response"
	"net/http"

	"github.com/gin-gonic/gin"
)

type EstateController struct {
	estateUseCase domain.EstateUsecase
}

func NewEstateController(
	estateUseCase domain.EstateUsecase,
) *EstateController {
	return &EstateController{
		estateUseCase: estateUseCase,
	}
}

func (c *EstateController) Create(ctx *gin.Context) error {
	var payload request.CreateEstatePayload

	err := request.Bind(ctx.Request, &payload)
	if err != nil {
		return err
	}

	estate, err := c.estateUseCase.Create(
		payload.Name,
		payload.Description,
		payload.EstateType,
		payload.SalesType,
		payload.Area,
		payload.Price,
		payload.Latitude,
		payload.Longitude,
		payload.Subdistrict,
		payload.District,
		payload.Province,
		payload.Insurance,
		payload.Owner,
	)
	if err != nil {
		return err
	}

	file, err := ctx.FormFile("Images")
	if err != nil {
		return err
	}
	filePath := fmt.Sprintf("./other/images/%d/%s", estate.ID, file.Filename)
	err = ctx.SaveUploadedFile(file, filePath)
	if err != nil {
		return err
	}
	estate, err = c.estateUseCase.SaveImage(fmt.Sprintf("%d", estate.ID), file.Filename)
	if err != nil {
		return err
	}

	return response.Success(ctx.Writer, http.StatusCreated, response.Map{
		"estate": estate,
	})
}

func (c *EstateController) GetById(ctx *gin.Context) error {
	id := ctx.Param("id")

	estate, err := c.estateUseCase.Get(id)
	if err != nil {
		return err
	}

	return response.Success(ctx.Writer, http.StatusOK, response.Map{
		"estate": estate,
	})
}

func (c *EstateController) GetAll(ctx *gin.Context) error {
	estates, err := c.estateUseCase.GetAll()
	if err != nil {
		return err
	}

	return response.Success(ctx.Writer, http.StatusOK, response.Map{
		"estates": estates,
	})
}

func (c *EstateController) GetAllVisible(ctx *gin.Context) error {
	estates, err := c.estateUseCase.GetAllVisible()
	if err != nil {
		return err
	}

	return response.Success(ctx.Writer, http.StatusOK, response.Map{
		"estates": estates,
	})
}

func (c *EstateController) ChangeVisible(ctx *gin.Context) error {
	id := ctx.Param("id")

	err := c.estateUseCase.ChangeVisible(id)
	if err != nil {
		return err
	}
	return response.Success(ctx.Writer, http.StatusOK, response.Map{})
}

func (c *EstateController) ChangeInfo(ctx *gin.Context) error {
	var payload request.ChangeInfoUserPayload
	user := middleware.GetUserFromCtx(ctx)

	err := request.Bind(ctx.Request, &payload)
	if err != nil {
		return err
	}

	// user, err = c.estateUseCase.ChangeInfo(

	// )
	// if err != nil {
	// 	return err
	// }

	return response.Success(ctx.Writer, http.StatusCreated, response.Map{
		"user": user,
	})
}

func (c *EstateController) Delete(ctx *gin.Context) error {
	id := ctx.Param("id")

	err := c.estateUseCase.Delete(id)
	if err != nil {
		return err
	}
	return response.Success(ctx.Writer, http.StatusOK, response.Map{})
}
