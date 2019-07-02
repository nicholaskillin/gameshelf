class GamesController < ApplicationController
  def create
    @game = current_user.games.build(game_params)
    if @game.save
      flash[:success] = "Game created!"
      redirect_to root_url
    else
      flash[:danger] = "There was a problem ¯\_(ツ)_/¯"
      redirect_to root_url
    end
  end

  def update
  end

  def destroy
  end

  private

    def game_params
      params.require(:title).permit(:description, :image, :play_time, :min_players, :max_players)
    end
end
