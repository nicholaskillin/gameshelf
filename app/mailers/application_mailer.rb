# frozen_string_literal: true

class ApplicationMailer < ActionMailer::Base
  default from: 'noreply@gameshelf.online'
  layout 'mailer'
end
