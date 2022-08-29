package list

import (
	"github.com/Levan-D/Scheduler-with-weather-widget/server/pkg/domain"
	uuid "github.com/satori/go.uuid"
)

type service struct {
	repository Repository
}

type Service interface {
	GetListByUserID(userId uuid.UUID) ([]domain.List, error)
}

func NewService(repository Repository) Service {
	return &service{
		repository: repository,
	}
}

func (s service) GetListByUserID(userId uuid.UUID) ([]domain.List, error) {
	return s.repository.FindListByUserID(userId)
}
