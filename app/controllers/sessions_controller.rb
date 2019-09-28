class SessionsController < ApplicationController
  skip_before_action :require_login
  def new
  end

  def create
    user = User.find_by(email: params[:session][:email].downcase)
    if user && user.authenticate(params[:session][:password])
      if user.activated?
        log_in user
        # params[:session][:remember_me] == '1' ? remember(user) : forget(user)
        redirect_to user_games_url(current_user.username)
      else
        message = "Your account is not activated. "
        message += "Check your email for your activation link."
        flash[:warning] = message
        redirect_to root_url
      end
    else
      flash.now[:danger] = 'Invalid email/password combination'
      render 'new'
    end
  end

  def destroy
    log_out if logged_in?
    redirect_to root_url
  end

end
