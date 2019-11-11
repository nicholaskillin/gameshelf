class GamesController < ApplicationController
  def create
    
    @categories = game_params[:categories]
    @mechanics = game_params[:mechanics]
    @game = Game.find_or_create_by(game_params.except(:categories, :mechanics)) do |game|
      
      @categories.each do |category|
        category_to_add = Category.find_by(bgg_id: category)
        game.categories << category_to_add
      end
      
      @mechanics.each do |mechanic|
        mechanic_to_add = Mechanic.find_by(bgg_id: mechanic)
        game.mechanics << mechanic_to_add
      end
            
    end

    current_user.games << @game

    render json: {game_id: @game.id}

  end

  def index
    @user = User.find_by_username(params[:user_username])
  end

  def details
    game = Game.find(params[:id])
    render json: {
                  game: game,
                  categories: game.categories,
                  mechanics: game.mechanics,
                }
  end

  def update
  end

  def destroy
    @game = current_user.games.find(params[:id])
    current_user.games.delete(@game)
    redirect_to user_games_url(current_user.username)
  end

  private

    def game_params
      params.permit(:title, :description, :image, :min_play_time, :max_play_time, :min_players, :max_players, :min_age, :bgg_number, :year_published, categories: [], mechanics: [])
    end
end
