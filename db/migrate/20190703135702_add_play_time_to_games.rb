class AddPlayTimeToGames < ActiveRecord::Migration[5.2]
  def change
    change_column :games, :play_time, :string
  end
end
