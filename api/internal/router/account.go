package router

import (
	"crypto/rand"
	"errors"
	"fmt"
	"log"
	"math/big"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"gorm.io/gorm"

	"github.com/octoi/spacechat/config"
	"github.com/octoi/spacechat/database"
)

func generateOTPCode() string {
	max := big.NewInt(1000000)
	n, _ := rand.Int(rand.Reader, max)
	return fmt.Sprintf("%06d", n.Int64())
}

func createAndLogOTP(phoneNumber string) (uint, error) {
	code := generateOTPCode()
	log.Printf("OTP for %s: %s", phoneNumber, code)

	otp := database.OTP{
		PhoneNumber: phoneNumber,
		Code:        code,
		ExpiresAt:   time.Now().Add(10 * time.Minute),
	}

	if err := database.DB.Create(&otp).Error; err != nil {
		return 0, err
	}

	return otp.ID, nil
}

type RegisterRequest struct {
	PhoneNumber string `json:"phone_number" binding:"required,max=15"`
	Name        string `json:"name" binding:"required,min=2,max=100"`
}

type LoginRequest struct {
	PhoneNumber string `json:"phone_number" binding:"required,max=15"`
}

type VerifyRequest struct {
	ID   uint   `json:"id" binding:"required"`
	Code string `json:"code" binding:"required"`
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

		newUser := database.User{
			PhoneNumber: req.PhoneNumber,
			Name:        req.Name,
		}

		if err := database.DB.Create(&newUser).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create user"})
			return
		}

		otpID, err := createAndLogOTP(req.PhoneNumber)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate OTP"})
			return
		}

		c.JSON(http.StatusCreated, gin.H{
			"message": "User registered, OTP sent",
			"data": gin.H{
				"id": otpID,
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
				c.JSON(http.StatusUnauthorized, gin.H{"error": "User not found"})
			} else {
				c.JSON(http.StatusInternalServerError, gin.H{"error": "Database error fetching user"})
			}
			return
		}

		otpID, err := createAndLogOTP(req.PhoneNumber)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate OTP"})
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"message": "OTP sent",
			"data": gin.H{
				"id": otpID,
			},
		})
	})

	rg.POST("/verify", func(c *gin.Context) {
		var req VerifyRequest
		if err := c.ShouldBindJSON(&req); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		var otp database.OTP
		if err := database.DB.First(&otp, req.ID).Error; err != nil {
			if errors.Is(err, gorm.ErrRecordNotFound) {
				c.JSON(http.StatusNotFound, gin.H{"error": "OTP request not found"})
			} else {
				c.JSON(http.StatusInternalServerError, gin.H{"error": "Database error checking OTP"})
			}
			return
		}

		if otp.Verified {
			c.JSON(http.StatusBadRequest, gin.H{"error": "OTP already verified"})
			return
		}

		if time.Now().After(otp.ExpiresAt) {
			c.JSON(http.StatusBadRequest, gin.H{"error": "OTP has expired"})
			return
		}

		if otp.Code != req.Code {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid OTP code"})
			return
		}

		otp.Verified = true
		if err := database.DB.Save(&otp).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update OTP status"})
			return
		}

		var user database.User
		if err := database.DB.Where("phone_number = ?", otp.PhoneNumber).First(&user).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "User not found for this OTP"})
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
			"message": "OTP verified successfully",
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
