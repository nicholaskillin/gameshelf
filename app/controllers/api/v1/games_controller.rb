class Api::V1::GamesController < ApplicationController

  def index
    @user = User.find_by_username(params[:username])
    games = @user.games.order(:title)
    games.each |game| do
      binding.pry
      game_id = game.game.id
      game_record = @user.game_users.find(game_id)
    end
    render json: { games: @user.games.order(:title),
                   availability: @user.game_users,
                 }
  end

end