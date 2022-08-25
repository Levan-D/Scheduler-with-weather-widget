package list

import (
	"github.com/gofiber/fiber/v2"
)

type handler struct {
	service Service
}

func RegisterHandlers(r fiber.Router, service Service) {
	h := handler{service}

	route := r.Group("/lists")
	{
		route.Get("/", h.blank)
		route.Post("/", h.blank)
		route.Put("/:id", h.blank)
		route.Delete("/:id", h.blank)
	}
}

func (h *handler) blank(c *fiber.Ctx) error {
	return nil
}
