package middleware

import (
	"nakaliving/backend/internal/constant"
	"nakaliving/backend/server/payload/response"

	"github.com/gin-gonic/gin"
	"go.uber.org/zap"
)

type HandlerFuncWithError = func(ctx *gin.Context) error

// Adaptor for custom http handler [HandlerFuncWithError] to satisfy [http.Handler] type
// This allow the handler function to return an error for error handling
func ErrorHandler(f HandlerFuncWithError) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		if err := f(ctx); err != nil {
			requestId, _ := ctx.Value(constant.RequestIdCtxKey).(string)

			zap.L().Error(
				"error from controller",
				zap.String("label", "controllerError"),
				zap.String("requestId", requestId),
				zap.Error(err),
			)

			_ = response.Error(ctx.Writer, err)
		}
	}
}

func Recovery(ctx *gin.Context) {
	defer func() {
		if r := recover(); r != nil {
			zap.L().Error(
				"panic from http handler",
				zap.Any("panic", r),
				zap.String("requestId", ctx.Writer.Header().Get("X-Request-ID")),
			)
			_ = response.Error(ctx.Writer, nil)
		}
	}()

	ctx.Next()
}
