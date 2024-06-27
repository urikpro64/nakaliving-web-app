package middleware

import (
	"errors"
	"fmt"
	"nakaliving/backend/domain"
	"nakaliving/backend/internal/constant"

	"github.com/gin-gonic/gin"
)

func NewAuthMiddleware(authUsecase domain.AuthUseCase) HandlerFuncWithError {
	return func(ctx *gin.Context) error {
		cookie, err := ctx.Cookie(constant.SessionCookieName)
		fmt.Println(err)
		if cookie == "" {
			ctx.Abort()
			return errors.New("blah blah blah")
		}

		user, err := authUsecase.Authenticate(cookie)
		if err != nil {
			ctx.Abort()
			return err
		}

		ctx.Set(constant.UserCtxLocal, user)
		ctx.Next()

		return nil
	}
}

func GetUserFromCtx(ctx *gin.Context) *domain.User {
	data, existed := ctx.Get(constant.UserCtxLocal)
	if !existed {
		return nil
	}

	return data.(*domain.User)
}
