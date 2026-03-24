# Architecture & Project Structure

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | Ruby 3.3.0, Rails 7.1.5.1 |
| Database | PostgreSQL |
| Frontend | React 18.2, TypeScript 5, Vite 5.4 |
| GraphQL | graphql-ruby (server), Apollo Client 3 (client) |
| Styling | Bootstrap 5.2, react-bootstrap 2.7 |
| File Uploads | CarrierWave + AWS S3 (prod), local tmp/ (dev) |
| Error Tracking | Sentry (production only) |
| CI/CD | CircleCI |

## Directory Layout

```
app/
├── controllers/          # Rails controllers + api/v1 namespace
├── graphql/              # Schema, types, mutations, queries
├── javascript/           # React/TypeScript frontend (Vite)
│   ├── components/       # React components
│   ├── controllers/      # Stimulus controllers
│   ├── hooks/            # Custom React hooks
│   ├── modules/          # Vanilla JS modules
│   ├── types/            # TypeScript type definitions
│   └── entrypoints/      # Vite entry points
├── mailers/              # UserMailer, FriendshipMailer
├── models/               # ActiveRecord models
├── uploaders/            # AvatarUploader (CarrierWave)
└── views/                # ERB templates

config/
├── routes.rb
├── database.yml
├── vite.json             # vite-ruby integration
└── initializers/         # rack_attack, sentry, carrierwave, invisible_captcha

db/
├── schema.rb             # Source of truth for DB structure
└── migrate/

spec/                     # RSpec tests (see testing.md)
```

## Key Architectural Patterns

- **Hybrid frontend**: ERB views mount React components via Stimulus + data attributes
- **GraphQL for game data**: Apollo Client talks to `/graphql` for game CRUD
- **REST JSON API** at `/api/v1/` for friendships and user search
- **Session-based auth**: `session[:user_id]`, no JWT
