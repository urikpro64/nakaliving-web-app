package controller

import (
	"net/http"

	errs "nakaliving/backend/domain/error"
	"nakaliving/backend/server/payload/response"

	"github.com/gin-gonic/gin"
)

type HealthController struct{}

func NewHealthController() *HealthController {
	return &HealthController{}
}

func (c *HealthController) Index(ctx *gin.Context) error {
	ctx.Cookie("gin_cookie")
	return response.Success(ctx.Writer, http.StatusOK, response.Map{
		"message": "hello world",
	})
}

func (c *HealthController) NotFound(ctx *gin.Context) error {
	return errs.New(errs.RouteNotFound, "No route for %s %s", ctx.Request.Method, ctx.Request.URL.Path)
}
