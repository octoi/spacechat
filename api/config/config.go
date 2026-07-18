package config

import (
	"log"

	"github.com/caarlos0/env"
	"github.com/joho/godotenv"
)

type EnvConfig struct {
	Port       string `env:"PORT,required"`
	DBHost     string `env:"DB_HOST,required"`
	DBName     string `env:"DB_NAME,required"`
	DBUser     string `env:"DB_USER,required"`
	DBPassword string `env:"DB_PASSWORD,required"`
	DBSSLMode  string `env:"DB_SSLMODE,required"`
	JWTSecret  string `env:"JWT_SECRET,required"`
}

func NewEnvConfig() *EnvConfig {
	err := godotenv.Load()

	if err != nil {
		log.Println("Uanble to load .env %e", err)
	}

	config := &EnvConfig{}

	if err := env.Parse(config); err != nil {
		log.Println("Uanble to load vairables from .env %e", err)
	}

	return config
}
