package errs

type Code int

const (
	Unknown Code = iota
	Internal
	RouteNotFound
	Validation
)

const (
	InvalidSession Code = iota + 1000
	ErrUnsignSession
	ErrDestroySession
	ErrDupSession
	ErrCreateSession
	ErrGetSession
	ErrValidateSession
	ErrInvalidSession
	ErrSessionExpired
)

const (
	ErrInvalidEmail Code = iota + 2000
	ErrInvalidPassword
	ErrCreateUser
	ErrGetUser
	ErrUserNotFound
	ErrDupEmail
)
