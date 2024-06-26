package domain

type AuthUseCase interface {
	Authenticate(header string) (*User, error)
	SignIn(email string, password string, ipAddress string, userAgent string) (*Cookie, error)
	SignOut(header string) (*Cookie, error)
}
