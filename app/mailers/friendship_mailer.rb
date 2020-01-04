class FriendshipMailer < ApplicationMailer
  default from: 'notifications@nicholaskillin.com'

  def new_friend_request
    @user = params[:user]
    @requester = params[:requester]
    mail(to: @user.email, subject: 'You have a new friend request on Game Shelf.')
  end
end
