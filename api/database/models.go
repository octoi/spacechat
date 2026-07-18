package database

// User represents an application user.
type User struct {
	ID          uint   `gorm:"primaryKey"`
	PhoneNumber string `gorm:"uniqueIndex;not null;size:15"`
	Name        string
	Password    string
}
