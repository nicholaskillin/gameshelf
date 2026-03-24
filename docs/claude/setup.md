# Development Setup & Commands

## Prerequisites

- Ruby 3.3.0 (see `.ruby-version`)
- Node.js + Yarn
- PostgreSQL

## Installation

```bash
bundle install
yarn install
rails db:create db:migrate
```

## Running Locally

```bash
bin/rails server   # Rails on :3000
bin/vite dev       # Vite HMR on :3036
```

Both are defined in `Procfile.dev`.

## All Commands

```bash
# Rails
rails server
rails db:migrate
rails db:schema:load

# Assets
bin/vite dev        # Dev server with HMR
bin/vite build      # Production build
yarn build
yarn build:clean    # Clean rebuild
yarn preview        # Preview production build

# TypeScript / Lint
yarn typecheck
yarn lint
yarn lint:fix

# Tests
bundle exec rspec
```

## Environment Variables

```env
# Database
DEV_DATABASE_PASSWORD     # Postgres password (development)
PGDATABASE / PGUSER / PGPASSWORD / PGHOST / PGPORT  # Production
DB_HOST / DB_PORT         # CI overrides

# AWS S3 (production file uploads)
S3_KEY / S3_SECRET / S3_REGION / S3_BUCKET_NAME

# Error tracking
SENTRY_DSN                # Production only

# Rails
RAILS_ENV
CI                        # Set by CircleCI
```
