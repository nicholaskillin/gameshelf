# Load the Rails application.
require_relative "application"

ActionMailer::Base.smtp_settings = {
  user_name: ENV['SENDGRID_USERNAME'],
  password: ENV['SENDGRID_PASSWORD'],
  domain: 'gameshelf.online',
  address: 'smtp.sendgrid.net',
  port: 587,
  authentication: :plain,
  enable_starttls_auto: true,
  open_timeout: 15,
  read_timeout: 15
}

# Initialize the Rails application.
Rails.application.initialize!
