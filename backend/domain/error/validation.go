package errs

import (
	"errors"
	"fmt"
)

type ValidationError struct {
	Field string `json:"field"`
	Tag   string `json:"tag"`
}

type ValidationErrors []ValidationError

func (ves ValidationErrors) Error() string {
	return fmt.Sprintf("validation failed with %d fields", len(ves))
}

func IsValidationErrors(err error) bool {
	var ves ValidationErrors
	return errors.As(err, &ves)
}

func GetValidationErrors(err error) ValidationErrors {
	var ves ValidationErrors
	if !errors.As(err, &ves) {
		return nil
	}
	return ves
}
