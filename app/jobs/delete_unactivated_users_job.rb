class DeleteUnactivatedUsersJob < ApplicationJob
  def perform
    users_that_never_activated.delete_all
  end

  private

  def users_that_never_activated
    User.unactivated.where("created_at < ?", 1.month.ago)
  end
end
