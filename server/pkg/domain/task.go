package domain

import (
	uuid "github.com/satori/go.uuid"
	"gorm.io/gorm"
	"time"
)

type Task struct {
	ID          uuid.UUID  `gorm:"primary_key;AUTO_INCREMENT;column:id;type:UUID;default:uuid_generate_v4();" json:"id"`
	ListID      *uuid.UUID `gorm:"column:list_id;type:UUID;" json:"list_id"`
	Title       string     `gorm:"column:title;type:VARCHAR;size:255;" json:"title"`
	IsCompleted *bool      `gorm:"column:is_completed;type:BOOL;default:false;" json:"is_completed"`
	CreatedAt   *time.Time `gorm:"column:created_at;type:TIMESTAMPTZ;" json:"created_at"`
	UpdatedAt   *time.Time `gorm:"column:updated_at;type:TIMESTAMPTZ;" json:"updated_at"`
	CompletedAt *time.Time `gorm:"column:completed_at;type:TIMESTAMPTZ;" json:"completed_at"`

	List *List `gorm:"ForeignKey:list_id;References:id" json:"list,omitempty"`
}

func (t *Task) TableName() string {
	return "task"
}

func (t *Task) BeforeSave(db *gorm.DB) error {
	return nil
}

func (t *Task) Prepare() {
}
