# GameShelf

A Ruby on Rails application for managing game collections.

## Project Structure

This is a Ruby on Rails application with the following key directories:
- `app/` - Main application code (models, views, controllers)
- `app/javascript/` - Frontend JavaScript/React components (using Vite)
- `config/` - Configuration files
- `db/` - Database migrations and schema
- `spec/` - Test files (RSpec)

## Development Commands

```bash
# Start the Rails development server
rails server

# Start the Vite development server (for assets)
bin/vite dev
# OR
yarn dev

# Build assets for production
bin/vite build
# OR
yarn build

# Clean build and rebuild assets
yarn build:clean

# Preview production build locally
yarn preview

# Type checking (TypeScript)
yarn typecheck

# Lint JavaScript/TypeScript files
yarn lint
yarn lint:fix

# Run tests
bundle exec rspec

# Run migrations
rails db:migrate

# Install dependencies
bundle install
yarn install
```

## Frontend Stack

- **Build Tool**: Vite (migrated from Shakapacker/Webpack)
- **Framework**: React 18 + TypeScript
- **Styling**: Bootstrap 5
- **State Management**: Apollo Client (GraphQL)

## Security Features

- Invisible captcha protection on user forms
- Rack Attack for rate limiting
- Captcha on password reset

## Recent Changes

- **Major Migration**: Migrated from Shakapacker to Vite for faster development builds
- Added game night feature with creator/host tracking
- Enhanced security measures for user registration