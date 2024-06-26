package constant

import (
	"os"
)

var (
	// Load from LDFLAGS
	Version = "unknown"
	BuiltAt = "unknown"

	Environment = os.Getenv("ENV")

	SessionCookieName = "sid"

	UserCtxLocal = "user"
)
