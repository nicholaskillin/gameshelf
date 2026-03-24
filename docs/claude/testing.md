# Testing Conventions

## Running Tests

```bash
bundle exec rspec                          # Full suite
bundle exec rspec spec/models/            # Models only
bundle exec rspec spec/graphql/           # GraphQL only
bundle exec rspec spec/models/user_spec.rb # Single file
```

## Structure

```
spec/
├── factories/       # FactoryBot definitions
├── models/          # Model unit tests
├── graphql/types/   # GraphQL type tests
├── jobs/            # Background job tests
└── support/
    └── helpers/authentication.rb  # Login helpers for request specs
```

## Factories

```ruby
create(:user)                # Activated user (FFaker data)
create(:not_activated_user)  # For testing activation flow
create(:game)
create(:category)
create(:mechanic)
```

## Conventions

- Transactional fixtures — DB rolled back after each test
- FFaker for realistic test data
- Use `spec/support/helpers/authentication.rb` to log in within request specs
