package router

import (
	"errors"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"

	"github.com/octoi/spacechat/config"
	"github.com/octoi/spacechat/database"
)

type RegisterRequest struct {
	PhoneNumber string `json:"phone_number" binding:"required,max=15"`
	Name        string `json:"name" binding:"required,min=2,max=100"`
	Password    string `json:"password" binding:"required,min=6"`
}

type LoginRequest struct {
	PhoneNumber string `json:"phone_number" binding:"required,max=15"`
	Password    string `json:"password" binding:"required"`
}

func AccountRouter(rg *gin.RouterGroup, cfg *config.EnvConfig) {
	rg.POST("/register", func(c *gin.Context) {
		var req RegisterRequest

		if err := c.ShouldBindJSON(&req); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		var existingUser database.User
		err := database.DB.Where("phone_number = ?", req.PhoneNumber).First(&existingUser).Error
		if err == nil {
			c.JSON(http.StatusConflict, gin.H{"error": "User with this phone number already exists"})
			return
		} else if !errors.Is(err, gorm.ErrRecordNotFound) {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Database error checking user existence"})
			return
		}

		hashedPassword, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to hash password"})
			return
		}

		newUser := database.User{
			PhoneNumber: req.PhoneNumber,
			Name:        req.Name,
			Password:    string(hashedPassword),
		}

		if err := database.DB.Create(&newUser).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create user"})
			return
		}

		c.JSON(http.StatusCreated, gin.H{
			"message": "User registered successfully",
			"data": gin.H{
				"id":           newUser.ID,
				"phone_number": newUser.PhoneNumber,
				"name":         newUser.Name,
			},
		})
	})

	rg.POST("/login", func(c *gin.Context) {
		var req LoginRequest

		if err := c.ShouldBindJSON(&req); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		var user database.User
		if err := database.DB.Where("phone_number = ?", req.PhoneNumber).First(&user).Error; err != nil {
			if errors.Is(err, gorm.ErrRecordNotFound) {
				c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid phone number or password"})
			} else {
				c.JSON(http.StatusInternalServerError, gin.H{"error": "Database error fetching user"})
			}
			return
		}

		if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(req.Password)); err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid phone number or password"})
			return
		}

		token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
			"sub": user.ID,
			"exp": time.Now().Add(time.Hour * 72).Unix(),
		})

		tokenString, err := token.SignedString([]byte(cfg.JWTSecret))
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate token"})
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"message": "Login successful",
			"data": gin.H{
				"user": gin.H{
					"id":           user.ID,
					"phone_number": user.PhoneNumber,
					"name":         user.Name,
				},
				"token": tokenString,
			},
		})
	})
}
