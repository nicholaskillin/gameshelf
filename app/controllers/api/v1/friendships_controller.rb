class Api::V1::FriendshipsController < ApplicationController
  protect_from_forgery with: :null_session, if: Proc.new {|c| c.request.format.json? }

  def create
    user = User.find(params[:user_id])
    current_user.friends << user
    FriendshipMailer.with(user: user, requester: current_user).new_friend_request.deliver_now
  end

end