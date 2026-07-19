package database

import "time"

// User represents an application user.
type User struct {
	ID          uint   `gorm:"primaryKey"`
	PhoneNumber string `gorm:"uniqueIndex;not null;size:15"`
	Name        string
}

// OTP represents a one-time password request
type OTP struct {
	ID          uint      `gorm:"primaryKey"`
	PhoneNumber string    `gorm:"not null"`
	Code        string    `gorm:"not null"`
	ExpiresAt   time.Time `gorm:"not null"`
	Verified    bool      `gorm:"default:false"`
}
