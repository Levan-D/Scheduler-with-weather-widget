package list

import (
	"github.com/Levan-D/Scheduler-with-weather-widget/server/internal/app/auth"
	"github.com/Levan-D/Scheduler-with-weather-widget/server/internal/app/errors"
	"github.com/Levan-D/Scheduler-with-weather-widget/server/internal/app/response"
	"github.com/Levan-D/Scheduler-with-weather-widget/server/pkg/domain"
	"github.com/gofiber/fiber/v2"
	uuid "github.com/satori/go.uuid"
	"net/http"
	"time"
)

type handler struct {
	service Service
}

func RegisterHandlers(r fiber.Router, service Service) {
	h := handler{service}

	route := r.Group("/lists", auth.Authorization)
	{
		route.Get("/", h.getList)
		route.Post("/", h.createList)
		route.Put("/:id", h.updateList)
		route.Delete("/:id", h.deleteList)
	}
}

type listResponse struct {
	ID        uuid.UUID  `json:"id"`
	Title     string     `json:"title"`
	Position  int32      `json:"position"`
	CreatedAt *time.Time `json:"created_at"`
	UpdatedAt *time.Time `json:"updated_at"`
}

func (h *handler) getList(c *fiber.Ctx) error {
	user := c.Locals(auth.LocalUser).(domain.User)

	result, err := h.service.GetListByUserID(user.ID)
	if err != nil {
		return err
	}

	lists := []listResponse{}
	for _, item := range result {
		lists = append(lists, listResponse{
			ID:        item.ID,
			Title:     item.Title,
			Position:  item.Position,
			CreatedAt: item.CreatedAt,
			UpdatedAt: item.UpdatedAt,
		})
	}

	return c.Status(http.StatusOK).JSON(lists)
}

type createListInput struct {
	Title string `json:"title"`
}

func (h *handler) createList(c *fiber.Ctx) error {
	user := c.Locals(auth.LocalUser).(domain.User)

	var input updateProfileInput
	if err := c.BodyParser(&input); err != nil {
		return response.NewError(c, errors.StatusBadRequest.LocaleWrapf(err, errors.ErrParseBody, errors.LocaleInvalidBody))
	}

	_, err := h.service.UpdateProfileByID(user.ID, UpdateUserProfileInput{
		FirstName: input.FirstName,
		LastName:  input.LastName,
	})
	if err != nil {
		return response.NewError(c, err)
	}

	return c.Status(http.StatusOK).JSON(response.Message{Message: "profile data has successfully updated"})
}

func (h *handler) updateList(c *fiber.Ctx) error {
	return nil
}

func (h *handler) deleteList(c *fiber.Ctx) error {
	return nil
}
