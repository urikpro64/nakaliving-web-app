package controller

import (
	"fmt"
	"net/http"

	errs "nakaliving/backend/domain/error"
	"nakaliving/backend/internal/constant"
	"nakaliving/backend/server/payload/response"

	"github.com/gin-gonic/gin"
)

type HealthController struct{}

func NewHealthController() *HealthController {
	return &HealthController{}
}

func (c *HealthController) Index(ctx *gin.Context) error {
	cookie, err := ctx.Cookie(constant.SessionCookieName)
	fmt.Println(cookie, err)
	return response.Success(ctx.Writer, http.StatusOK, response.Map{
		"message": "hello world",
	})
}

func (c *HealthController) NotFound(ctx *gin.Context) error {
	return errs.New(errs.RouteNotFound, "No route for %s %s", ctx.Request.Method, ctx.Request.URL.Path)
}
