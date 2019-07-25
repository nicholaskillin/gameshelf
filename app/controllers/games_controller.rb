class GamesController < ApplicationController
  def create
    
    @categories = game_params[:categories]
    @game = current_user.games.build(game_params.except(:categories))
    
    if @game.save
      
      @categories.each do |category|
        category_to_add = Category.find_by(bgg_id: category)
        @game.categories << category_to_add
      end
      
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
      params.permit(:title, :description, :image, :min_play_time, :max_play_time, :min_players, :max_players, categories: [])
    end
end
