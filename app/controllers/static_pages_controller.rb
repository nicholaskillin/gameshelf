class StaticPagesController < ApplicationController
  skip_before_action :require_login
  def home
    if logged_in?
      redirect_to user_games_url(current_user.username)
    end
  end

end
