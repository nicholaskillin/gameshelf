class Api::V1::GamesController < ApplicationController

  def index
    logger.debug "Debug #{params}"
    user = User.find_by_username(params[:username])
    render json: { games: user.games }
  end

end