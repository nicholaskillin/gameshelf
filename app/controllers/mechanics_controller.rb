class MechanicsController < ApplicationController
  
  def create
    # logger.debug 'mechanic_params'
    @mechanic = Mechanic.find_or_create_by(mechanic_params)
    if @mechanic.save
      # do nothing
    else
      flash[:danger] = "There was a problem creating one of the game mechanics ¯\_(ツ)_/¯"
      redirect_to root_url
    end
  end

  private

    def mechanic_params
      params.permit(:name, :bgg_id)
    end

end
