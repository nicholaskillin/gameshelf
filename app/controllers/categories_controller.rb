class CategoriesController < ApplicationController

  def create
    
    category_params[:categories].each do |param|
      Category.find_or_create_by(param[1])
    end

    render json: {category_params[:categories] => []}

  end

  private

    def category_params
      params.permit(categories: [:name, :bgg_id])
    end
end
