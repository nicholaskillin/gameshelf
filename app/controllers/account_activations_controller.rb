class AccountActivationsController < ApplicationController
  skip_before_action :require_login

  def edit
    user = User.find_by(email: params[:email])
    if user && !user.activated? && user.authenticated?(:activation, params[:id])
      user.activate
      log_in user
      flash[:success] = "Account activated!"
<<<<<<< HEAD
      redirect_to user_games_url(current_user.username)
=======
      redirect_to user_url(current_user.username)
>>>>>>> follow-users
    else
      flash[:danger] = "Invalid activation link"
      redirect_to root_url
    end
  end
end
