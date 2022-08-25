package me

import (
	"github.com/Levan-D/Scheduler-with-weather-widget/server/internal/app/auth"
	"github.com/Levan-D/Scheduler-with-weather-widget/server/pkg/domain"
	"github.com/gofiber/fiber/v2"
	"net/http"
)

type handler struct {
	service Service
}

func RegisterHandlers(r fiber.Router, service Service) {
	h := handler{service}

	profile := r.Group("/me", auth.Authorization)
	{
		profile.Get("/", h.getMe)
	}
}

type meResponse struct {
	Email     string `json:"email"`
	FirstName string `json:"first_name"`
	LastName  string `json:"last_name"`
}

// @Tags Me
// @Summary Retrieve a me
// @Accept json
// @Produce json
// @Security BearerAuth
// @Success 200 {object} meResponse
// @Failure 400 {object} response.Error
// @Failure 403 {object} response.Error
// @Failure 500 {object} response.Error
// @Router /me [get]
func (h *handler) getMe(c *fiber.Ctx) error {
	user := c.Locals(auth.LocalUser).(domain.User)

	return c.Status(http.StatusOK).JSON(meResponse{
		Email:     user.Email,
		FirstName: user.FirstName,
		LastName:  user.LastName,
	})
}
