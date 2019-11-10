class Api::V1::GamesController < ApplicationController

  def index
    render json: { games: User.find_by_username(params[:username]).games.order(params[:sort]) }
  end

end