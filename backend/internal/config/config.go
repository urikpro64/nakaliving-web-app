package config

import (
	"fmt"
	"os"
	"path/filepath"

	"go.uber.org/zap"
	"gopkg.in/yaml.v3"
)

type Config struct {
	Client ConfigClient `yaml:"client"`
	Auth   ConfigAuth   `yaml:"auth"`
}

type ConfigClient struct {
	Mysql ConfigMysql `yaml:"mysql"`
	HTTP  ConfigHTTP  `yaml:"http"`
}

type ConfigMysql struct {
	Host string `yaml:"host"`
	Port int    `yaml:"port"`
	DB   string `yaml:"db"`
	User string `yaml:"user"`
	Pass string `yaml:"pass"`
}

type ConfigHTTP struct {
	Address string `yaml:"address"`
}

type ConfigAuth struct {
	Session ConfigAuthSession `yaml:"session"`
	Admin   ConfigAuthAdmin   `yaml:"admin"`
}

type ConfigAuthSession struct {
	Secret string `yaml:"secret" `
	MaxAge int    `yaml:"maxAge" validate:"number,required"`
}

type ConfigAuthAdmin struct {
	Secret string `yaml:"secret"`
}

func Load(path string) (*Config, error) {
	if err := validatePath(path); err != nil {
		return nil, err
	}

	file, err := os.Open(filepath.Clean(path))
	if err != nil {
		return nil, err
	}
	defer file.Close()

	var config *Config
	if err := yaml.NewDecoder(file).Decode(&config); err != nil {
		return nil, err
	}

	return config, nil
}

func MustLoad(path string) *Config {
	cfg, err := Load(path)
	if err != nil {
		zap.L().Fatal("cannot load a config file", zap.Error(err))
	}
	zap.L().Info("configuration file loaded successfully")
	return cfg
}

func validatePath(path string) error {
	info, err := os.Stat(path)
	if err != nil {
		return err
	}
	if info.IsDir() {
		return fmt.Errorf("%s is a directory, not a file", path)
	}
	return nil
}
