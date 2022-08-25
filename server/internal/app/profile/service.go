package profile

import (
	"github.com/Levan-D/Scheduler-with-weather-widget/server/internal/app/errors"
	"github.com/Levan-D/Scheduler-with-weather-widget/server/pkg/domain"
	uuid "github.com/satori/go.uuid"
)

type service struct {
	repository Repository
}

type Service interface {
	UpdateProfileByID(id uuid.UUID, input UpdateUserProfileInput) (domain.User, error)
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

func (s *service) UpdateProfileByID(id uuid.UUID, input UpdateUserProfileInput) (domain.User, error) {
	var err error

	item, err := s.repository.UpdateByID(id, domain.User{
		FirstName: input.FirstName,
		LastName:  input.LastName,
	})
	if err != nil {
		return domain.User{}, errors.StatusInternalServer.LocaleWrapf(err, "cannot be update a user", errors.LocaleUndefined)
	}

	return item, nil
}
