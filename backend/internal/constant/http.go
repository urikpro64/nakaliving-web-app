package constant

type contextKey string

const (
	SessionPrefix = "$:"

	HttpErrorCtxKey contextKey = "error"
	RequestIdCtxKey contextKey = "requestId"
)
