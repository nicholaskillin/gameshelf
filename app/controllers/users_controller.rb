class UsersController < ApplicationController

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      log_in @user
      flash[:success] = "Account created successfully."
      redirect_to @user
    else
      flash[:danger] = "Your account was not created. Please correct the errors below and try again."
      render 'new'
    end
  end

  def show
  end

  def destroy
  end

  private
    def user_params
      params.require(:user).permit(:name, :email, :password, :password_confirmation)
    end

end
