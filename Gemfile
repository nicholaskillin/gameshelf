source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

gem 'rails', '7.0.8.1'
ruby '3.3.0'

gem 'bcrypt'
gem 'bootsnap', '>= 1.1.0', require: false
gem 'bootstrap', '~> 4.3.1'
gem 'bugsnag', '~> 6.13'
gem 'carrierwave'
gem 'coffee-rails'
gem 'figaro'
gem 'fog-aws'
gem 'graphql'
gem 'invisible_captcha'
gem 'jbuilder', '~> 2.5'
gem 'jquery-rails'
gem 'pg'
gem 'psych', '< 4'
gem 'puma'
gem 'rack-attack'
gem 'rails-controller-testing'
gem 'react-rails'
gem 'rexml'
gem 'sass-rails', '~> 5.0'
gem 'sentry-rails'
gem 'sentry-ruby'
gem 'shakapacker', '6.5.5'
gem 'stackprof'
gem 'turbolinks', '~> 5'
gem 'uglifier'

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
  gem 'dotenv'
  gem 'factory_bot_rails'
  gem 'ffaker'
  gem 'pry'
  gem 'pry-remote'
  gem 'rspec-rails', '~> 4.0.1'
  gem 'rubocop-thread_safety', require: false
end

group :development do
  gem 'guard'
  gem 'guard-rspec', require: false
  gem 'listen', '>= 3.0.5', '< 3.2'
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
  gem 'web-console', '>= 3.3.0'
end

group :test do
  # Adds support for Capybara system testing and selenium driver
  gem 'capybara', '>= 2.15'
  gem 'selenium-webdriver'
  # Easy installation and use of chromedriver to run system tests with Chrome
  gem 'webdrivers', '~> 3.0'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
gem 'graphiql-rails', group: :development
