package common

import (
	"github.com/Levan-D/Scheduler-with-weather-widget/server/pkg/database/postgres"
	"github.com/Levan-D/Scheduler-with-weather-widget/server/pkg/domain"
	uuid "github.com/satori/go.uuid"
)

func FindUserByID(id uuid.UUID) (user domain.User, err error) {
	err = postgres.GetDB().Where("id = ?", id).First(&user).Error
	return user, err
}
