class UsersController < ApplicationController
  skip_before_action :require_login, only: %i[new create]
  before_action :correct_user, only: %i[edit update]

  invisible_captcha only: [:create],
                    honeypot: :last_name,
                    on_spam: :spam_detected

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      @user.send_activation_email
      flash[:info] = "Please check your email to activate your account."
      redirect_to root_url
    else
      flash[
        :danger
      ] = "Your account was not created. Please correct the errors below and try again."
      render "new"
    end
  end

  def show
    @user = User.find_by_username(params[:username])
    @games = @user.games
  end

  def edit
    @user = User.find_by_username(params[:username])
  end

  def update
    @user = User.find_by_username(params[:username])

    if @user.update(user_params)
      flash[:success] = "User updated"
      redirect_to user_url(current_user.username)
    else
      render "edit"
    end
  end

  def destroy
  end

  private

  def spam_detected
    redirect_to root_url
  end

  def user_params
    params.require(:user).permit(
      :name,
      :username,
      :email,
      :password,
      :password_confirmation,
      :avatar
    )
  end

  # Confirms current user
  def correct_user
    @user = User.find_by_username(params[:username])
    if current_user?(@user)
    else
      flash[:danger] = "Can't edit someone else's profile"
      redirect_to user_url(current_user.username)
    end
  end
end
