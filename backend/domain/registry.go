package domain

type UseCases struct {
	Auth      AuthUsecase
	User      UserUsecase
	Session   SessionUsecase
	Estate    EstateUsecase
	Operation OperationUsecase
}

type Repositories struct {
	User      UserRepository
	Session   SessionRepository
	Estate    EstateRepository
	Operation OperationRepository
}
