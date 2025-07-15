# GameShelf

A Ruby on Rails application for managing game collections.

## Project Structure

This is a Ruby on Rails application with the following key directories:
- `app/` - Main application code (models, views, controllers)
- `config/` - Configuration files
- `db/` - Database migrations and schema
- `spec/` - Test files (RSpec)

## Development Commands

```bash
# Start the development server
rails server

# Run tests
bundle exec rspec

# Run migrations
rails db:migrate

# Install dependencies
bundle install
```

## Security Features

- Invisible captcha protection on user forms
- Rack Attack for rate limiting
- Captcha on password reset

## Recent Changes

- Added spam detection with captcha
- Implemented rate limiting with Rack Attack
- Enhanced security measures for user registration