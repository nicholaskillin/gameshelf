# Load the Rails application.
require_relative "application"

ActionMailer::Base.smtp_settings = {
  user_name: ENV['POSTAL_USERNAME'],
  password: ENV['POSTAL_PASSWORD'],
  domain: 'gameshelf.online',
  address: 'postal.nicholaskillin.com',
  port: 25,#587,
  authentication: :plain,
  enable_starttls_auto: true,
  open_timeout: 15,
  read_timeout: 15
}

# Initialize the Rails application.
Rails.application.initialize!
