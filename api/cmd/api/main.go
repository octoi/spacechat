package main

import (
	"log"

	"github.com/octoi/spacechat/config"
	"github.com/octoi/spacechat/database"
)

func main() {
	log.Println("Starting Spacechat API...")

	// Load configuration
	cfg := config.NewEnvConfig()

	// Connect to database
	err := database.Connect(cfg)
	if err != nil {
		log.Fatalf("Failed to initialize database: %v", err)
	}

	log.Println("Spacechat API started successfully on port", cfg.ServerPort)
}