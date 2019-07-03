class GamesController < ApplicationController
  def create
    logger.debug 'game_params'
    @game = current_user.games.build(game_params)
    if @game.save
      flash[:success] = "Game created!"
      redirect_to current_user, turbolinks: false
    else
      flash[:danger] = "There was a problem ¯\_(ツ)_/¯"
      redirect_to root_url
    end
  end

  def update
  end

  def destroy
    @game = current_user.games.find(params[:id])
    @game.destroy
    redirect_to current_user
  end

  private

    def game_params
      params.permit(:title, :description, :image, :min_play_time, :max_play_time, :min_players, :max_players)
    end
end
