package domain

type UseCases struct {
	Auth    AuthUseCase
	User    UserUseCase
	Session SessionUseCase
}

type Repositories struct {
	User    UserRepository
	Session SessionRepository
}
