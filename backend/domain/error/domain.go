package errs

import (
	"errors"
	"fmt"
)

type DomainError struct {
	Code    Code   `json:"code"`
	Message string `json:"message"`
	Err     error  `json:"-"`
}

func new(code Code, err error, message string, params ...interface{}) *DomainError {
	if len(params) > 0 {
		message = fmt.Sprintf(message, params...)
	}
	return &DomainError{
		Code:    code,
		Message: message,
		Err:     err,
	}
}

// Create a new [DomainError] with code and error message.
// The message argument can follow a printf-style format,
// where the params parameter serves as a placeholder.
func New(code Code, message string, params ...interface{}) *DomainError {
	return new(code, nil, message, params...)
}

// Wrap an error into a [DomainError]. If the wrapped error is already a domain error,
// it will use the error code from it; otherwise, the code is set to Unknown (0).
//
// The message argument can follow a printf-style format,
// where the params parameter serves as a placeholder.
func Wrap(err error, message string, params ...interface{}) *DomainError {
	code := Unknown
	if IsDomainError(err) {
		code = GetDomainError(err).Code
	}
	return new(code, err, message, params...)
}

// TODO: comment
func WrapCode(err error, code Code, message string, params ...interface{}) *DomainError {
	return new(code, err, message, params...)
}

func (de *DomainError) Error() string {
	msg := fmt.Sprintf("domain error code %d: %s", de.Code, de.Message)
	if de.Err != nil {
		msg += fmt.Sprintf(": %s", de.Err.Error())
	}
	return msg
}

func (de *DomainError) Unwrap() error {
	return de.Err
}

func IsDomainError(err error) bool {
	var de *DomainError
	return errors.As(err, &de)
}

func GetDomainError(err error) *DomainError {
	var de *DomainError
	if !errors.As(err, &de) {
		return nil
	}
	return de
}
