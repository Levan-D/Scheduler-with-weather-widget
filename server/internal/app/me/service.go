package me

import (
	"github.com/Levan-D/Scheduler-with-weather-widget/server/pkg/domain"
	uuid "github.com/satori/go.uuid"
)

type service struct {
	repository Repository
}

type Service interface {
	GetByID(id uuid.UUID) (domain.User, error)
}

type UpdateUserProfileInput struct {
	FirstName string
	LastName  string
}

func NewService(repository Repository) Service {
	return &service{
		repository: repository,
	}
}

func (s *service) GetByID(id uuid.UUID) (domain.User, error) {
	return s.repository.FindByID(id)
}
