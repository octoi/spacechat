package router

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/octoi/spacechat/config"
)

func SetupRouter(cfg *config.EnvConfig) *gin.Engine {
	r := gin.Default()

	r.GET("/ping", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "pong",
		})
	})

	v1 := r.Group("/api/v1")

	accounts := v1.Group("/accounts")
	AccountRouter(accounts, cfg)

	return r
}
