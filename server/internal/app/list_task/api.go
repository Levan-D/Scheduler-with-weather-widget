package list_task

import (
	"github.com/Levan-D/Scheduler-with-weather-widget/server/internal/app/auth"
	"github.com/gofiber/fiber/v2"
)

type handler struct {
	service Service
}

func RegisterHandlers(r fiber.Router, service Service) {
	h := handler{service}

	route := r.Group("/lists/:listId/tasks", auth.Authorization)
	{
		route.Get("/", h.getListTask)
		route.Post("/complete", h.completeListTask)
		route.Put("/:id", h.updateListTask)
		route.Delete("/:id", h.deleteListTask)
	}
}

func (h *handler) getListTask(c *fiber.Ctx) error {
	return nil
}

func (h *handler) completeListTask(c *fiber.Ctx) error {
	return nil
}

func (h *handler) updateListTask(c *fiber.Ctx) error {
	return nil
}

func (h *handler) deleteListTask(c *fiber.Ctx) error {
	return nil
}
