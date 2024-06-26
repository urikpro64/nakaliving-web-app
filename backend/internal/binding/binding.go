package binding

import (
	"net/http"
)

const (
	MIMEApplicationJSON = "application/json"
	MIMEApplicationForm = "application/x-www-form-urlencoded"
	MIMEMultipartForm   = "multipart/form-data"
)

type Binding interface {
	Bind(r *http.Request, v interface{}) error
}

// Default bindings
var (
	JSON          = jsonBinding{}
	Form          = formBinding{}
	MultipartForm = multipartFormBinding{}
)

func Default(method string, contentType string) Binding {
	if method == http.MethodGet {
		return Form
	}

	switch contentType {
	case MIMEApplicationJSON:
		return JSON
	case MIMEMultipartForm:
		return MultipartForm
	default:
		return Form
	}
}
