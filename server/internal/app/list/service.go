package list

type service struct {
	repository Repository
}

type Service interface {
}

func NewService(repository Repository) Service {
	return &service{
		repository: repository,
	}
}
