class Api::V1::GamesController < ApplicationController

  def index
    render json: { games: current_user.games }
  end

end