package server

import (
	"context"
	"nakaliving/backend/domain"
	"nakaliving/backend/platform"
	"nakaliving/backend/server/controller"
	"nakaliving/backend/server/middleware"
	"net/http"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"

	"go.uber.org/zap"
)

type HTTPServer struct {
	server    *http.Server
	router    *gin.Engine
	platforms *platform.Platforms
	useCases  *domain.UseCases
}

func New(
	address string,
	platforms *platform.Platforms,
	useCases *domain.UseCases,
) *HTTPServer {
	gin.SetMode(gin.ReleaseMode)

	return &HTTPServer{
		server:    &http.Server{Addr: address},
		router:    gin.New(),
		platforms: platforms,
		useCases:  useCases,
	}
}

func (s *HTTPServer) applyRoutes() http.Handler {
	s.router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173"},
		AllowMethods:     []string{"GET", "POST", "PATCH"},
		AllowHeaders:     []string{"Content-Type", "Access-Control-Allow-Headers"},
		AllowCredentials: true,
		ExposeHeaders:    []string{"Set-Cookie"},
		MaxAge:           12 * time.Hour,
	}))

	// Initialize controllers
	healthController := controller.NewHealthController()
	userController := controller.NewUserController(s.useCases.User)
	authController := controller.NewAuthController(s.useCases.Auth, s.useCases.User)
	estateController := controller.NewEstateController(s.useCases.Estate)
	// operationController := controller.NewOperationController(s.useCases.Operation)

	// Initialize middlewares
	c := middleware.ErrorHandler // For alias, c stand for controller

	authMiddleware := middleware.NewAuthMiddleware(s.useCases.Auth)

	// Apply middlewares
	s.router.Use(middleware.Recovery)

	// Apply static path
	s.router.Static("/images", "./other/images")

	// Apply routes
	s.router.GET("/", c(healthController.Index))
	s.router.NoRoute(c(healthController.NotFound))

	s.router.GET("/user/:id", c(userController.GetById))
	s.router.PATCH("/user/changeinfo", c(authMiddleware), c(userController.ChangeInfo))
	s.router.POST("/user", c(userController.Create))

	s.router.GET("/auth/me", c(authMiddleware), c(authController.Me))
	s.router.POST("/auth/signin", c(authController.SignIn))
	s.router.POST("/auth/signout", c(authController.SignOut))

	s.router.GET("/estate", c(estateController.GetAll))
	s.router.GET("/estate/:id", c(estateController.GetById))
	s.router.GET("/estate/visible", c(estateController.GetAllVisible))
	s.router.PATCH("/estate/:id/visible", c(estateController.ChangeVisible))
	s.router.POST("/estate", c(authMiddleware), c(estateController.Create))
	return s.router
}

func (s *HTTPServer) MustStart() {
	zap.S().Infof("http server is starting up on %s", s.server.Addr)

	s.server.Handler = s.applyRoutes()

	if err := s.server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
		zap.L().Fatal("cannot start http server", zap.Error(err))
	}
}

func (s *HTTPServer) Stop() {
	zap.L().Info("http server is shutting down")
	if err := s.server.Shutdown(context.Background()); err != nil {
		zap.L().Error("cannot shutdown http server", zap.Error(err))
	}
	zap.L().Info("http server exited")
}
