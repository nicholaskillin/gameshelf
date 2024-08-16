class PasswordResetsController < ApplicationController
  before_action :get_user, only: %i[edit update]
  before_action :valid_user, only: %i[edit update]
  before_action :check_expiration, only: %i[edit update]
  skip_before_action :require_login

  invisible_captcha only: [:create],
                    honeypot: :confirm_email,
                    on_spam: :spam_detected

  def new
  end

  def create
    @user = User.find_by(email: params[:password_reset][:email].downcase)
    if @user
      @user.create_reset_digest
      @user.send_password_reset_email
      flash[:info] = "Password Reset Email Sent"
      redirect_to root_url
    else
      flash.now[:danger] = "Email address not found"
      render "new"
    end
  end

  def edit
  end

  def update
    if params[:user][:password].empty?
      @user.errors.add(:password, "can't be empty")
      render "edit"
    elsif @user.update_attributes(user_params)
      log_in @user
      flash[:success] = "Your password has been reset"
      redirect_to @user
    else
      render "edit"
    end
  end

  private

  def user_params
    params.require(:user).permit(:password, :password_confirmation)
  end

  def get_user
    @user = User.find_by(email: params[:email])
  end

  def valid_user
    unless (
             @user && @user.activated? &&
               @user.authenticated?(:reset, params[:id])
           )
      redirect_to root_url
    end
  end

  def check_expiration
    if @user.password_reset_expired?
      flash[
        :danger
      ] = "Password reset has expired. Please request a new password reset email."
      redirect_to new_password_reset_url
    end
  end

  def spam_detected
    flash[:info] = "Password Reset Email Sent"
    redirect_to root_url
  end
end
