class Game < ApplicationRecord
  has_many :users, through: :game_users
  has_and_belongs_to_many :categories
  has_and_belongs_to_many :mechanics
end
