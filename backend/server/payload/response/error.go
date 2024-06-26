package response

import (
	"net/http"

	errs "nakaliving/backend/domain/error"
)

type statusCodeMap map[errs.Code]int

// Map for translation [errs.Code] to http status code
// Default to http status 500 if not provided in this map
var DomainCodeMap = statusCodeMap{
	errs.RouteNotFound: http.StatusNotFound,

	errs.InvalidSession: http.StatusUnauthorized,
}

func (m statusCodeMap) Get(domainErr *errs.DomainError) int {
	code, ok := m[domainErr.Code]
	if ok {
		return code
	}
	return http.StatusInternalServerError
}
