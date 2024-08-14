# frozen_string_literal: true

module SentryExtras
  extend ActiveSupport::Concern

  included { before_action :set_sentry_context }

  def set_sentry_context
    return unless current_user

    Sentry.set_user(
      id: current_user.id,
      ip_address: request.remote_ip,
      email: current_user.email,
    )
  end
end
