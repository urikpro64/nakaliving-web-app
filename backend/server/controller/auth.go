package controller

import (
	"nakaliving/backend/domain"
	"nakaliving/backend/internal/constant"
	"nakaliving/backend/server/middleware"
	"nakaliving/backend/server/payload/request"
	"nakaliving/backend/server/payload/response"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

type AuthController struct {
	authUseCase domain.AuthUseCase
	userUseCase domain.UserUseCase
}

func NewAuthController(
	authUseCase domain.AuthUseCase,
	userUseCase domain.UserUseCase,
) *AuthController {
	return &AuthController{
		authUseCase: authUseCase,
		userUseCase: userUseCase,
	}
}

func (c *AuthController) Me(ctx *gin.Context) error {
	return response.Success(ctx.Writer, http.StatusOK, middleware.GetUserFromCtx(ctx))
}

func (c *AuthController) SignIn(ctx *gin.Context) error {
	var payload request.SignInPayload

	err := request.Bind(ctx.Request, &payload)
	if err != nil {
		return err
	}

	ipAddress := ctx.ClientIP()
	userAgent := ctx.Request.UserAgent()

	cookie, err := c.authUseCase.SignIn(payload.Email, payload.Password, ipAddress, string(userAgent))
	if err != nil {
		return err
	}
	ctx.SetCookie(cookie.Name, cookie.Value, cookie.MaxAge, cookie.Path, cookie.Domain, cookie.Secure, cookie.HTTPOnly)
	return response.Success(ctx.Writer, http.StatusOK, response.Map{
		"expired_at": cookie.MaxAge,
	})
}

func (c *AuthController) SignOut(ctx *gin.Context) error {
	sid, _ := ctx.Cookie(constant.SessionCookieName)
	cookie, err := c.authUseCase.SignOut(sid)
	if err != nil {
		return err
	}

	ctx.SetCookie(cookie.Name, cookie.Value, cookie.MaxAge, cookie.Path, cookie.Domain, cookie.Secure, cookie.HTTPOnly)

	return response.Success(ctx.Writer, http.StatusOK, response.Map{
		"sign_out_at": time.Now(),
	})
}
