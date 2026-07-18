package database

import (
	"fmt"
	"log"

	"github.com/octoi/spacechat/config"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func Connect(cfg *config.EnvConfig) error {
	dsn := fmt.Sprintf(
		"host=%s user=%s password=%s dbname=%s port=5432 sslmode=%s",
		cfg.DBHost, cfg.DBUser, cfg.DBPassword, cfg.DBName, cfg.DBSSLMode,
	)

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		return fmt.Errorf("failed to connect to database: %w", err)
	}

	log.Println("Successfully connected to the database")

	// Auto migrate the schema
	err = db.AutoMigrate(
		&User{},
	)
	if err != nil {
		return fmt.Errorf("failed to auto-migrate database schema: %w", err)
	}

	log.Println("Database schema migrated successfully")
	DB = db
	return nil
}
