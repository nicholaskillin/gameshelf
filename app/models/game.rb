class Game < ApplicationRecord
  has_many :game_users, dependent: :destroy
  has_many :users, through: :game_users
  has_and_belongs_to_many :categories
  has_and_belongs_to_many :mechanics

  def available?(user, game)
    user.game_users.find_by_game_id(game.id).available
  end
end
