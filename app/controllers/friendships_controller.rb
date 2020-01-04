class FriendshipsController < ApplicationController
  before_action :correct_user
  
  def index
    @user = User.find_by_username(params[:user_username])
    @pending_friendships = @user.pending_friend_requests
    @active_friendships = @user.active_friends
  end

  private
    # Confirms current user
    def correct_user
      @user = User.find_by_username(params[:username])
      if current_user?(@user)
      else
        flash[:danger] = "Can't see someone else's friends."
        redirect_to user_url(current_user.username)
      end
    end
end
