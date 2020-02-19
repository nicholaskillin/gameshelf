class Api::V1::GamesController < ApplicationController

  def index
    @user = User.find_by_username(params[:username])
    @games = @user.games.order(:title)
    games = []
    
    @games.each do |game|
      games.push({ game: game, availablity: game.available?(@user, game) })
    end
    
    render json: { games: games }
  end

end