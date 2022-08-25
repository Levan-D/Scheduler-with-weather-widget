package list_task

import (
	"gorm.io/gorm"
)

type repository struct {
	db *gorm.DB
}

type Repository interface {
}

func NewRepository(db *gorm.DB) Repository {
	return &repository{db: db}
}
