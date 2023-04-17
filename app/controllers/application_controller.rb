class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :require_login
  before_action :set_current_user, if: :current_user

  include SessionsHelper

  private

  def require_login
    unless current_user
      redirect_to login_url
    end
  end

  def set_current_user
    Current.user = current_user
  end
end
