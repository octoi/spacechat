start-db:
	@docker compose up -d

stop-db:
	@docker compose down -v

dev:
	go run -mod=vendor cmd/api/main.go

vendor:
	GOMODCACHE=$$(pwd)/.modcache go mod tidy
	GOMODCACHE=$$(pwd)/.modcache go mod vendor

get:
	@if [ -z "$(PKG)" ]; then echo "Usage: make get PKG=<package>"; exit 1; fi
	GOMODCACHE=$$(pwd)/.modcache go get $(PKG)
	@$(MAKE) vendor