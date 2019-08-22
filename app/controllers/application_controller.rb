class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :require_login

  include SessionsHelper

  private

  def require_login
    unless current_user
      redirect_to login_url
    end
  end
end
