package config

import (
	"fmt"
)

type Config struct {
	Server struct {
		Port string `default:"8080"`
	}
	Database struct {
		Type     string `default:"postgres"`
		Host     string `required:"true"`
		Port     string `default:"5432"`
		Username string `required:"true"`
		Password string `required:"true"`
		DBName   string `required:"true"`
	}
}

var config Config

func LoadConfig() error {

	if config.Database.Host == "" {
		return fmt.Errorf("database host is required")
	}
	if config.Database.Username == "" {
		return fmt.Errorf("database username is required")
	}
	if config.Database.Password == "" {
		return fmt.Errorf("database password is required")
	}
	if config.Database.DBName == "" {
		return fmt.Errorf("database name is required")
	}

	return nil
}

func GetConfig() *Config {
	return &config
}
