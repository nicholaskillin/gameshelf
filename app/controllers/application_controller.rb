# frozen_string_literal: true

class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :require_login
  before_action :set_current_user, if: :current_user

  include SessionsHelper
  include SentryExtras

  private

  def require_login
    redirect_to login_url unless current_user
  end

  def set_current_user
    Current.user = current_user
  end
end
