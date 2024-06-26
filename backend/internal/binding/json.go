package binding

import (
	"encoding/json"
	"net/http"
)

type jsonBinding struct{}

func (jsonBinding) Bind(r *http.Request, dest interface{}) error {
	return json.NewDecoder(r.Body).Decode(dest)
}
