package main

import (
	"log"

	"github.com/octoi/spacechat/config"
	"github.com/octoi/spacechat/database"
	"github.com/octoi/spacechat/internal/router"
)

func main() {
	log.Println("Starting Spacechat API...")

	cfg := config.NewEnvConfig()

	err := database.Connect(cfg)
	if err != nil {
		log.Fatalf("Failed to initialize database: %v", err)
	}

	router := router.SetupRouter(cfg)

	log.Println("Spacechat API started successfully on port", cfg.Port)
	if err := router.Run(":" + cfg.Port); err != nil {
		log.Fatalf("Failed to run server: %v", err)
	}
}
