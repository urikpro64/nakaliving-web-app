package request

import (
	"errors"
	"fmt"
	"nakaliving/backend/internal/binding"
	"nakaliving/backend/internal/validator"
	"net/http"
	"strings"
)

func Bind(r *http.Request, dest interface{}) error {
	b := binding.Default(r.Method, GetContentType(r))
	if b == nil {
		return errors.New("unsupported http content type")
	}
	if err := b.Bind(r, dest); err != nil {
		return fmt.Errorf("cannot process http request payload: %w", err)
	}
	return validator.Struct(dest)
}

func GetContentType(r *http.Request) string {
	return strings.TrimSpace(strings.Split(r.Header.Get("Content-Type"), ";")[0])
}
