class SessionsController < ApplicationController
  def new
  end

  def create
    user = User.find_by(email: params[:session][:email].downcase)
    if user && user.authenticate(params[:session][:password])
      # Add user activation and includ if statement here that sees if they are activated or not.
      log_in user
      # add in ability to remember user "params[:session][:remember_me] == '1' ? remember(user) : forget(user)"
      redirect_back_or user
    else
      flash.now[:danger] = 'Oops, that did not work.'
      render 'new'
    end
  end

end
