package binding

import (
	"net/http"

	"github.com/go-playground/form"
)

const maxFormMemory = 32 << 20 // 32 MiB
var formDecoder = form.NewDecoder()

type formBinding struct{}
type multipartFormBinding struct{}

func (formBinding) Bind(r *http.Request, dest interface{}) error {
	if err := r.ParseForm(); err != nil {
		return err
	}
	if err := formDecoder.Decode(dest, r.Form); err != nil {
		return err
	}
	return nil
}

func (multipartFormBinding) Bind(r *http.Request, dest interface{}) error {
	if err := r.ParseMultipartForm(maxFormMemory); err != nil {
		return err
	}
	if err := formDecoder.Decode(dest, r.Form); err != nil {
		return err
	}
	return nil
}
