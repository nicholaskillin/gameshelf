class CategoriesController < ApplicationController

  def create
    # logger.debug 'category_params'
    @category = Category.find_or_create_by(category_params)
    if @category.save
      # do nothing
    else
      flash[:danger] = "There was a problem creating one of the game categories ¯\_(ツ)_/¯"
      redirect_to root_url
    end
  end

  private

    def category_params
      params.permit(:name, :bgg_id)
    end
end
