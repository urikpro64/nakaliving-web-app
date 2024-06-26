package platform

type Platform interface {
	Close()
}

type Platforms struct {
	*Mysql
}
