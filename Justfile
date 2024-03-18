SERVICE := "zinklar_challenge"

default:
	@just --list

install:
	@docker compose run --rm {{SERVICE}} npm install

add deps:
	@docker compose run --rm {{SERVICE}} npm install '{{deps}}'

add_dev deps:
	@docker compose run --rm {{SERVICE}} npm install '{{deps}}'

build:
	@docker compose run --rm {{SERVICE}} npm run build

dev:
	@docker compose run --rm --service-ports {{SERVICE}} npm run dev

test_unit:
	@docker compose run --rm {{SERVICE}} npm run test:unit

test_unit_watch:
	@docker compose run --rm {{SERVICE}} npm run test:unit:watch

test_unit_coverage:
	@docker compose run --rm {{SERVICE}} npm run test:unit:coverage

test_unit_watch_coverage:
	@docker compose run --rm {{SERVICE}} npm run test:unit:watch:coverage

test_integration:
	@docker compose run --rm {{SERVICE}} npm run test:integration

test_integration_watch:
	@docker compose run --rm {{SERVICE}} npm run test:integration:watch
