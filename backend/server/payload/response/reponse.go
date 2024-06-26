package response

import (
	"encoding/json"
	"net/http"

	errs "nakaliving/backend/domain/error"

	"go.uber.org/zap"
)

type Map = map[string]interface{}

type Response struct {
	Success bool           `json:"success"`
	Data    interface{}    `json:"data,omitempty"`
	Error   *ResponseError `json:"error,omitempty"`
}

type ResponseError struct {
	Code    errs.Code `json:"code"`
	Message string    `json:"message"`
}

// Send a success response with the JSON content type to the client.
// Returns a non-nil error just for eliminating `return nil` in the controller.
func Success(w http.ResponseWriter, status int, data interface{}) error {
	responseJson(w, status, Response{
		Success: true,
		Data:    data,
	})
	return nil
}

// Send an error response with the JSON content type to the client.
// Returns a non-nil error just for eliminating `return nil` in the controller.
func Error(w http.ResponseWriter, err error) error {
	var status int
	resp := Response{Success: false}

	switch {
	case errs.IsDomainError(err):
		de := errs.GetDomainError(err) // Use the outermost [errs.DomainError]
		resp.Error = &ResponseError{de.Code, de.Message}
		status = DomainCodeMap.Get(de)

	case errs.IsValidationErrors(err):
		ves := errs.GetValidationErrors(err)
		resp.Data = ves // Use all struct fields of [errs.ValidationErrors] as response data
		resp.Error = &ResponseError{errs.Validation, ves.Error()}
		status = http.StatusBadRequest

	default:
		resp.Error = &ResponseError{errs.Internal, "internal server error"}
		status = http.StatusInternalServerError
	}

	responseJson(w, status, resp)
	return nil
}

// Send a response in JSON format. If there is an error during JSON encoding,
// send a raw response body instead.
func responseJson(w http.ResponseWriter, status int, resp Response) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)

	if err := json.NewEncoder(w).Encode(resp); err != nil {
		// Fallback to string format if cannot marshal JSON as the response

		// It never returns a non-nil error
		// nolint:errcheck
		// #nosec G104
		w.Write([]byte(err.Error()))

		zap.L().Error("fallback JSON response to raw data", zap.Error(err))
	}
}
