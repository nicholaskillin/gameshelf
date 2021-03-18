class MechanicsController < ApplicationController
  def create
    return unless mechanic_params[:mechanics]

    mechanic_params[:mechanics].each do |param|
      Mechanic.find_or_create_by(param[1])
    end

    render json: { mechanic_params[:mechanics] => [] }
  end

  private

  def mechanic_params
    params.permit(mechanics: %i[name bgg_id])
  end
end
