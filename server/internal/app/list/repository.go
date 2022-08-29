package list

import (
	"github.com/Levan-D/Scheduler-with-weather-widget/server/pkg/domain"
	uuid "github.com/satori/go.uuid"
	"gorm.io/gorm"
)

type repository struct {
	db *gorm.DB
}

type Repository interface {
	FindListByUserID(userId uuid.UUID) (lists []domain.List, err error)
}

func NewRepository(db *gorm.DB) Repository {
	return &repository{db: db}
}

func (r repository) FindListByUserID(userId uuid.UUID) (lists []domain.List, err error) {
	err = r.db.Where("user_id = ?", userId).Find(&lists).Error
	if err != nil {
		return []domain.List{}, err
	}
	return lists, nil
}
