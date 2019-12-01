class Api::V1::FriendshipsController < ApplicationController
  protect_from_forgery with: :null_session, if: Proc.new {|c| c.request.format.json? }

  def create
    user = User.find(params[:userid])
    current_user.friends << user
  end

end