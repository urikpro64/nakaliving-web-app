package main

import (
	"flag"
	"nakaliving/backend/domain"
	"nakaliving/backend/internal/config"
	"nakaliving/backend/internal/constant"
	"nakaliving/backend/platform"
	"nakaliving/backend/repository"
	"nakaliving/backend/server"
	"nakaliving/backend/usecase"
	"os"
	"os/signal"
	"syscall"

	"go.uber.org/zap"
)

func main() {
	platform.MustSetupLogger()

	hostname, _ := os.Hostname()
	zap.S().Infof("version=%s buildAt=%s host=%s", constant.Version, constant.BuiltAt, hostname)

	// Load flags
	var configPath string
	flag.StringVar(&configPath, "config", "./config/config.yaml", "path to a config file")
	flag.Parse()

	// Initialize dependencies
	cfg := config.MustLoad(configPath)
	platforms := initPlatforms(cfg)
	repositories := initRepository(platforms)
	useCases := initUseCases(cfg, repositories)

	httpServer := server.New(cfg.Client.HTTP.Address, platforms, useCases)
	go httpServer.MustStart()

	// Shutdown signal
	closeSignals := make(chan os.Signal, 1)
	signal.Notify(closeSignals, syscall.SIGINT, syscall.SIGTERM)
	<-closeSignals

	// Gracefully shutdown & clean up dependencies
	httpServer.Stop()
}

func initPlatforms(cfg *config.Config) *platform.Platforms {
	return &platform.Platforms{
		Mysql: platform.Connect(&cfg.Client.Mysql),
	}
}

func initUseCases(cfg *config.Config, repositories *domain.Repositories) *domain.UseCases {
	user := usecase.NewUserUsecase(repositories.User)
	session := usecase.NewSessionUseCase(cfg, repositories.Session)
	auth := usecase.NewAuthUseCase(cfg, session, user)

	return &domain.UseCases{
		Auth:    auth,
		Session: session,
		User:    user,
	}
}

func initRepository(platforms *platform.Platforms) *domain.Repositories {
	return &domain.Repositories{
		User:    repository.NewUserRepository(platforms.Mysql),
		Session: repository.NewSessionRepository(platforms.Mysql),
	}
}
