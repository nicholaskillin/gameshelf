# Database Schema & Models

## Schema

| Table | Key Columns |
|-------|-------------|
| `users` | id, name, email (unique), username (unique), password_digest, avatar, activated, activation_digest, reset_digest, reset_sent_at |
| `games` | id, title, bgg_number, description, image, min/max_players, min/max_play_time, min_age, best_number_of_players, year_published, rules_url, playthrough_url |
| `game_users` | id, user_id, game_id, rules_video, available |
| `friendships` | id, user_id, friend_id |
| `categories` | id, bgg_id, name |
| `mechanics` | id, bgg_id, name |
| `categories_games` | category_id, game_id |
| `games_mechanics` | game_id, mechanic_id |

## Model Relationships

### User
```ruby
has_many :game_users
has_many :games, through: :game_users
has_many :friendships
has_many :friends, through: :friendships

# Notable methods
active_friends          # Mutual (bidirectional) friendships
pending_friends         # Sent, not yet reciprocated
pending_friend_requests # Received, not yet reciprocated
activated?              # Must be true before login allowed
password_reset_expired? # 2-hour expiration check
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
# Mutual = both directions exist in the table
is_mutual   # true if reciprocal record exists
```

### GameUser
```ruby
belongs_to :user
belongs_to :game
# Extra fields: rules_video (string), available (boolean)
```
