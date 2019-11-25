class FriendshipsController < ApplicationController
  
  def index
    @user = User.find_by_username(params[:user_username])
    @pending_friendships = @user.pending_friends
    @active_friendships = @user.active_friends
  end

end
