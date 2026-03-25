# Controllers, Routes & API

## Routes Summary

```ruby
root                    'static_pages#home'
post '/graphql'         # GraphqlController#execute

# Auth
get/post  '/signup'
get/post  '/login'
delete    '/logout'

# User resources (param: :username)
resources :users do
  resources :games
  resources :friendships
end

resources :account_activations, only: [:edit]
resources :password_resets,     only: [:new, :create, :edit, :update]

# JSON API
namespace :api do
  namespace :v1 do
    resources :games, :users, :friendships
  end
end
```

## Controllers

| Controller | Key Notes |
|-----------|-----------|
| `ApplicationController` | `before_action :require_login` globally; sets Sentry user context |
| `UsersController` | Registration (skip login); `correct_user` guard on edit/update |
| `SessionsController` | Requires activated account; sets `session[:user_id]` |
| `GamesController` | Finds-or-creates Game, Category, Mechanic records from BGG data |
| `FriendshipsController` | Lists active + pending friendships |
| `Api::V1::UsersController` | JSON — search by email, destroy account |
| `Api::V1::FriendshipsController` | JSON — create/destroy; CSRF disabled |
| `GraphqlController` | Executes GraphQL via POST /graphql |
| `PasswordResetsController` | Token validation; 2-hour expiration |
| `AccountActivationsController` | Email token activation |

## GraphQL API

### Types
- `GameType` — all game fields + categories, mechanics associations
- `CategoryType` — id, bgg_id, name
- `MechanicType` — id, bgg_id, name

### Queries
```graphql
games: [GameType]!
game(id: ID!): GameType
```

### Mutations
```graphql
createGame(input: {
  gameAttributes: { title: String!, bgg_number: Int, ... }
  categories: [{ bgg_id: Int!, name: String! }]
  mechanics:  [{ bgg_id: Int!, name: String! }]
}): CreateGamePayload
```
