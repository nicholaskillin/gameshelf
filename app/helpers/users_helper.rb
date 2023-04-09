# frozen_string_literal: true

module UsersHelper
  def can_add_games?(user)
    current_user == user
  end
end
