package validator

import (
	"reflect"
	"strings"

	errs "nakaliving/backend/domain/error"

	baseValidator "github.com/go-playground/validator/v10"
)

// Use a global instance for caching struct info globally
var validate *baseValidator.Validate

func init() {
	validate = baseValidator.New()

	// Use field name from json tag
	validate.RegisterTagNameFunc(func(fld reflect.StructField) string {
		name := strings.SplitN(fld.Tag.Get("json"), ",", 2)[0]
		if name == "-" {
			return ""
		}
		return name
	})
}

func Struct(obj interface{}) error {
	if err := validate.Struct(obj); err != nil {
		var ves errs.ValidationErrors
		for _, vErr := range err.(baseValidator.ValidationErrors) {
			ves = append(ves, errs.ValidationError{
				Field: vErr.Field(),
				Tag:   vErr.Tag(),
			})
		}
		return ves
	}
	return nil
}
