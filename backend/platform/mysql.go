package platform

import (
	"database/sql"
	"fmt"
	"nakaliving/backend/domain"
	"nakaliving/backend/internal/config"
	"time"

	"go.uber.org/zap"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

type Mysql struct {
	*gorm.DB
}

var _ Platform = (*Mysql)(nil)

func Init(cfg *config.ConfigMysql) error {
	// Connect without database name
	dbinit, err := sql.Open("mysql", fmt.Sprintf(
		"%s:%s@tcp(%s:%d)/",
		cfg.User,
		cfg.Pass,
		cfg.Host,
		cfg.Port,
	))
	if err != nil {
		return fmt.Errorf("failed to connect to database: %w", err)
	}

	_, err = dbinit.Exec("CREATE DATABASE " + cfg.DB)
	if err != nil {
		zap.L().Info(
			"connected to mysql",
			zap.String("label", "platformInit"),
			zap.String("platform", "mysql"),
			zap.String("message", "database exist"),
		)
	}

	defer dbinit.Close()
	return nil
}

func Connect(cfg *config.ConfigMysql) *Mysql {
	start := time.Now()
	Init(cfg)

	gormDB, err := gorm.Open(mysql.Open(fmt.Sprintf(
		"%s:%s@tcp(%s:%d)/%s?charset=utf8mb4&parseTime=True&loc=Local",
		cfg.User,
		cfg.Pass,
		cfg.Host,
		cfg.Port,
		cfg.DB,
	)), &gorm.Config{})

	if err != nil {
		zap.L().Fatal("cannot open mysql connection", zap.Error(err))
	}

	zap.L().Info(
		"connected to mysql",
		zap.String("label", "platformConnection"),
		zap.String("platform", "mysql"),
		zap.String("connectionTime", time.Since(start).String()),
	)

	Migrate(gormDB)

	return &Mysql{DB: gormDB}
}

func Migrate(gormDB *gorm.DB) error {
	err := gormDB.AutoMigrate(
		&domain.User{},
	)
	if err != nil {
		return fmt.Errorf("failed to migrate to database: %w", err)
	}
	return nil
}

func (m *Mysql) Close() {

}
