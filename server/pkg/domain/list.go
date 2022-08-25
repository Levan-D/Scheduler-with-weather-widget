package domain

import (
	uuid "github.com/satori/go.uuid"
	"gorm.io/gorm"
	"time"
)

type List struct {
	ID        uuid.UUID  `gorm:"primary_key;AUTO_INCREMENT;column:id;type:UUID;default:uuid_generate_v4();" json:"id"`
	UserID    *uuid.UUID `gorm:"column:user_id;type:UUID;" json:"user_id"`
	Title     string     `gorm:"column:title;type:VARCHAR;size:255;" json:"title"`
	Position  int32      `gorm:"column:position;type:INT4;default:0;" json:"position"`
	CreatedAt *time.Time `gorm:"column:created_at;type:TIMESTAMPTZ;" json:"created_at"`
	UpdatedAt *time.Time `gorm:"column:updated_at;type:TIMESTAMPTZ;" json:"updated_at"`

	User  *User   `gorm:"ForeignKey:user_id;References:id" json:"user,omitempty"`
	Tasks *[]Task `gorm:"foreignKey:ListID;references:ID" json:"tasks,omitempty"`
}

func (l *List) TableName() string {
	return "list"
}

func (l *List) BeforeSave(db *gorm.DB) error {
	return nil
}

func (l *List) Prepare() {
}
