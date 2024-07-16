package domain

type UseCases struct {
	Auth    AuthUsecase
	User    UserUsecase
	Session SessionUsecase
	Estate  EstateUsecase
}

type Repositories struct {
	User    UserRepository
	Session SessionRepository
	Estate  EstateRepository
}
