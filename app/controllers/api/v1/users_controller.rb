class Api::V1::UsersController < ApplicationController

  def index
    render json: { users: User.where("email like ?", "%#{params[:email]}%") }
  end

  def destroy
    @user = User.find(user_params[:id])
    if current_user = @user
      @user.destroy
    end
    redirect_to root_path
    flash[:success] = "Your account has been deleted"
  end

  private

  def user_params
    params.permit(:id)
  end

end