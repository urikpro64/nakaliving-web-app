package platform

import (
	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
)

func MustSetupLogger() {
	encoding := "console"
	encodeLevel := zapcore.LowercaseLevelEncoder

	// Similar to [zap.NewProductionConfig] with some updates
	config := zap.Config{
		Level: zap.NewAtomicLevelAt(zap.InfoLevel),

		Development: false,
		Sampling: &zap.SamplingConfig{
			Initial:    100,
			Thereafter: 100,
		},
		Encoding: encoding,

		EncoderConfig: zapcore.EncoderConfig{
			TimeKey:       "ts",
			LevelKey:      "level",
			NameKey:       "logger",
			CallerKey:     zapcore.OmitKey,
			FunctionKey:   zapcore.OmitKey,
			MessageKey:    "msg",
			StacktraceKey: zapcore.OmitKey,

			LineEnding:     zapcore.DefaultLineEnding,
			EncodeLevel:    encodeLevel,
			EncodeTime:     zapcore.ISO8601TimeEncoder,
			EncodeDuration: zapcore.SecondsDurationEncoder,
			EncodeCaller:   zapcore.ShortCallerEncoder,
		},

		OutputPaths:      []string{"stderr"},
		ErrorOutputPaths: []string{"stderr"},
	}

	zap.ReplaceGlobals(zap.Must(config.Build()))
}
