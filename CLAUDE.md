# GameShelf

A Ruby on Rails + React application for managing board game collections with social features (friendships, game sharing) and BoardGameGeek integration.

---

## Tech Stack

- **Backend**: Ruby 3.3.0, Rails 7.1.5.1, PostgreSQL
- **Frontend**: React 18.2, TypeScript 5, Vite 5.4
- **GraphQL**: graphql-ruby (server), Apollo Client 3 (client)
- **Styling**: Bootstrap 5.2, react-bootstrap 2.7
- **Auth**: bcrypt (has_secure_password), session-based
- **File Uploads**: CarrierWave + AWS S3 (production), local tmp/ (development)
- **Testing**: RSpec 7.1, FactoryBot, Capybara, FFaker
- **CI/CD**: CircleCI
- **Error Tracking**: Sentry

---

## Project Structure

```
app/
├── controllers/          # Rails controllers + API v1 namespace
├── graphql/              # GraphQL schema, types, mutations, queries
│   ├── types/            # GameType, CategoryType, MechanicType
│   ├── mutations/        # CreateGame mutation
│   └── game_shelf_schema.rb
├── javascript/           # React/TypeScript frontend (Vite-managed)
│   ├── components/
│   │   ├── Views/Games/Index.tsx      # Main games list view
│   │   ├── Games/GameDetailsModal.jsx # Game detail popup
│   │   ├── shared/NewGameModal.tsx    # BGG search + add game
│   │   ├── shared/ProfileHeader.tsx  # User profile header
│   │   ├── delete_user_button.jsx    # Account deletion
│   │   └── AppProvider.tsx           # React component registry + Apollo setup
│   ├── controllers/                  # Stimulus controllers
│   │   └── react_component_controller.js
│   ├── hooks/useGraphql.js
│   ├── modules/friend_search.js      # Friend search (vanilla JS)
│   ├── types/global.d.ts
│   └── entrypoints/application.js   # Webpack/Vite entry
├── mailers/              # UserMailer, FriendshipMailer
├── models/               # ActiveRecord models
├── uploaders/            # AvatarUploader (CarrierWave)
└── views/                # ERB templates

config/
├── routes.rb
├── database.yml
├── vite.json             # Vite integration config
├── initializers/
│   ├── rack_attack.rb    # Rate limiting rules
│   ├── invisible_captcha.rb
│   ├── carrierwave.rb    # S3 / local storage config
│   └── sentry.rb         # Error tracking (production only)
└── environments/

db/
├── schema.rb             # Source of truth for DB structure
└── migrate/

spec/
├── factories/            # FactoryBot factories
├── models/
├── graphql/
├── jobs/
└── support/helpers/authentication.rb
```

---

## Development Setup

### Prerequisites

- Ruby 3.3.0 (see `.ruby-version`)
- Node.js + Yarn
- PostgreSQL

### Installation

```bash
bundle install
yarn install
rails db:create db:migrate
```

### Running Locally

```bash
# Run both servers (recommended)
# Procfile.dev defines:
#   web:  bin/rails s
#   vite: bin/vite dev

bin/rails server          # Rails on :3000
bin/vite dev              # Vite HMR on :3036
# OR
yarn dev
```

### All Development Commands

```bash
# Rails
rails server
rails db:migrate
rails db:schema:load

# Assets
bin/vite dev              # Dev server with HMR
bin/vite build            # Production build
yarn build
yarn build:clean          # Clean rebuild
yarn preview              # Preview production build

# TypeScript / Lint
yarn typecheck
yarn lint
yarn lint:fix

# Tests
bundle exec rspec
bundle exec rspec spec/models/user_spec.rb  # Single file

# Dependencies
bundle install
yarn install
```

---

## Environment Variables

```env
# Database
DEV_DATABASE_PASSWORD     # Postgres password (development)
PGDATABASE                # Production DB name
PGUSER / PGPASSWORD       # Production DB credentials
PGHOST / PGPORT           # Production DB host/port
DB_HOST / DB_PORT         # CI overrides

# AWS S3 (production avatars)
S3_KEY
S3_SECRET
S3_REGION
S3_BUCKET_NAME

# Error tracking
SENTRY_DSN                # Production only

# Rails
RAILS_ENV
CI                        # Set by CircleCI for DB config
```

---

## Database Schema

| Table | Key Columns |
|-------|-------------|
| `users` | id, name, email (unique), username (unique), password_digest, avatar, activated, activation_digest, reset_digest, reset_sent_at |
| `games` | id, user_id, title, bgg_number, description, image, min/max_players, min/max_play_time, min_age, best_number_of_players, year_published, rules_url, playthrough_url |
| `game_users` | id, user_id, game_id, rules_video, available |
| `friendships` | id, user_id, friend_id |
| `categories` | id, bgg_id, name |
| `mechanics` | id, bgg_id, name |
| `categories_games` | category_id, game_id (join table) |
| `games_mechanics` | game_id, mechanic_id (join table) |

---

## Models & Relationships

### User
```ruby
has_many :game_users
has_many :games, through: :game_users
has_many :friendships
has_many :friends, through: :friendships

# Key methods
activate
authenticated?(attribute, token)
active_friends          # Mutual (bidirectional) friendships
pending_friends         # Sent requests not yet reciprocated
pending_friend_requests # Received requests not yet reciprocated
send_activation_email
send_password_reset_email
password_reset_expired?
```

### Game
```ruby
has_many :game_users
has_many :users, through: :game_users
has_and_belongs_to_many :categories
has_and_belongs_to_many :mechanics
default_scope { order(:title) }
```

### Friendship (directed)
```ruby
belongs_to :user
belongs_to :friend, class_name: 'User'
# Mutual friendship = both directions exist
is_mutual  # returns true if reciprocal record exists
```

### GameUser (join table)
```ruby
belongs_to :user
belongs_to :game
# attributes: rules_video, available (boolean)
```

---

## Controllers

### Authentication Pattern
- `before_action :require_login` applied globally in `ApplicationController`
- Individual controllers skip with `skip_before_action :require_login, only: [...]`
- `correct_user` guard checks username ownership for edit/update actions
- Session stored as `session[:user_id]`

### Key Controllers

| Controller | Namespace | Notes |
|-----------|-----------|-------|
| `UsersController` | root | Registration, profile, account management |
| `SessionsController` | root | Login/logout |
| `GamesController` | root | Add/manage games; associates BGG categories & mechanics |
| `FriendshipsController` | root | View friends list |
| `Api::V1::UsersController` | api/v1 | JSON - search users by email, delete account |
| `Api::V1::FriendshipsController` | api/v1 | JSON - create/destroy friendships (CSRF disabled) |
| `GraphqlController` | root | POST /graphql endpoint |
| `PasswordResetsController` | root | Password reset flow |
| `AccountActivationsController` | root | Email activation flow |

---

## Routes

```ruby
root                    'static_pages#home'
post '/graphql'         GraphqlController#execute

# Auth
get  '/signup'          users#new
post '/signup'          users#create
get  '/login'           sessions#new
post '/login'           sessions#create
delete '/logout'        sessions#destroy

# Users
resources :users, param: :username do
  resources :games
  resources :friendships
end

# Account management
resources :account_activations, only: [:edit]
resources :password_resets, only: [:new, :create, :edit, :update]

# JSON API
namespace :api do
  namespace :v1 do
    resources :games
    resources :users
    resources :friendships
  end
end
```

---

## GraphQL API

### Types
- `GameType` - all game fields plus associations (categories, mechanics)
- `CategoryType` - id, bgg_id, name
- `MechanicType` - id, bgg_id, name

### Queries
```graphql
games: [GameType]!
game(id: ID!): GameType
```

### Mutations
```graphql
createGame(input: {
  gameAttributes: {
    title: String!
    bgg_number: Int
    description: String
    # ... all game fields
  }
  categories: [{ bgg_id: Int!, name: String! }]
  mechanics: [{ bgg_id: Int!, name: String! }]
}): CreateGamePayload
```

### Frontend Setup (`AppProvider.tsx`)
- Apollo Client configured with HTTP link to `/graphql/`
- CSRF token injected from `<meta name="csrf-token">` tag
- `credentials: 'same-origin'`
- Components registered by string name for Stimulus-based mounting

---

## Frontend Architecture

### Component Mounting (Stimulus + React)
The app uses a hybrid approach:
1. Stimulus `ReactComponentController` reads `data-react-component` attribute
2. Looks up component in `AppProvider` registry
3. Mounts React component with props from `data-react-props`

```erb
<%# In ERB view %>
<div data-controller="react-component"
     data-react-component="Views/Games/Index"
     data-react-props="<%= { games: @games }.to_json %>">
</div>
```

### Key Components

**`NewGameModal.tsx`** - Add game workflow:
1. User types search term
2. Fetches XML from BoardGameGeek XMLAPI2 (`https://www.boardgamegeek.com/xmlapi2/search`)
3. Parses results, user selects game
4. Fires `CREATE_GAME` GraphQL mutation
5. Categories & mechanics auto-populated from BGG data

**`Views/Games/Index.tsx`** - Games list:
- Sortable by title or play time
- Renders `GameCard` components
- Opens `GameDetailsModal` on click

### Module Conventions
- Path aliases configured: `components/`, `modules/`, `hooks/`
- Use TypeScript for new components (`.tsx`/`.ts`)
- Legacy components in `.jsx`/`.js` are fine to keep as-is
- Bootstrap utility classes preferred over custom CSS

---

## Security

### Rate Limiting (Rack Attack)
- General: 300 requests / 5 min per IP
- Login: 5 attempts / 20 sec per IP + per email
- Password reset: 5 requests / 20 sec per IP + per email
- Assets excluded from rate limiting

### Forms
- `invisible_captcha` on signup and password reset
- Standard Rails CSRF protection
- `has_secure_password` (bcrypt) for passwords

### Account Activation
- Required before login is allowed
- Token generated on signup, sent via email
- `AccountActivationsController#edit` validates token

### Password Reset
- 2-hour token expiration
- Token validated server-side before allowing password change

---

## Email

- `UserMailer`: account_activation, password_reset
- `FriendshipMailer`: new_friend_request notification
- Uses `deliver_now` (synchronous)

---

## Testing Conventions

### Running Tests
```bash
bundle exec rspec                           # Full suite
bundle exec rspec spec/models/             # Models only
bundle exec rspec spec/graphql/            # GraphQL only
```

### Factories (FactoryBot)
```ruby
create(:user)               # Activated user
create(:not_activated_user) # For testing activation flow
create(:game)
create(:category)
create(:mechanic)
```

### Helpers
- `spec/support/helpers/authentication.rb` - Login helpers for request specs
- Transactional fixtures enabled (database cleaned between tests)
- FFaker used for realistic test data

### Test Location Conventions
- `spec/models/` for model unit tests
- `spec/graphql/types/` for GraphQL type tests
- `spec/jobs/` for background job tests
- Integration tests via Capybara in `spec/requests/` or `spec/features/`

---

## File Uploads

- **Development**: Stored in `tmp/` (local filesystem)
- **Production**: AWS S3 via CarrierWave + fog-aws
- Uploader class: `AvatarUploader`
- Config in `config/initializers/carrierwave.rb`

---

## Key Workflows

### User Registration Flow
1. `GET /signup` → form
2. `POST /signup` → invisible captcha check → create user (inactivated)
3. Email sent with activation token
4. `GET /account_activations/:token?email=...` → activate user
5. Redirect to login

### Adding a Game
1. User clicks "Add Game" → `NewGameModal` opens
2. Search BGG API for game name
3. Select game from results
4. `CREATE_GAME` GraphQL mutation fires
5. `GamesController` / GraphQL resolver finds-or-creates `Game`, `Category`, `Mechanic` records
6. Creates `GameUser` join record for the user

### Friendship Flow
1. User searches for friend (`friend_search.js` module → `GET /api/v1/users?email=...`)
2. Click "Add Friend" → `POST /api/v1/friendships`
3. Email notification sent (FriendshipMailer)
4. Target user sends request back
5. Both records exist → friendship is "active" (mutual)

---

## CI/CD (CircleCI)

```yaml
# .circleci/config.yml
- Ruby 3.3.0 with Node
- PostgreSQL 9.5 service
- Steps: bundle install, yarn install, db:schema:load, rspec
```

---

## Linting

```yaml
# .eslintrc.yml
extends: airbnb
rules:
  semi: 0             # No semicolons
  react/prop-types: 0 # PropTypes not required
```

Prettier handles formatting; run `yarn lint:fix` to auto-fix.
