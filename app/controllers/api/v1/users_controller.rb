class Api::V1::UsersController < ApplicationController

  def index
    render json: { users: User.where("email like ?", "%#{params[:email]}%") }
  end

end