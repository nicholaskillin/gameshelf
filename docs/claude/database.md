# Models

For the current database schema (tables, columns, indexes) read `db/schema.rb` directly — it is the source of truth and always up to date.

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
