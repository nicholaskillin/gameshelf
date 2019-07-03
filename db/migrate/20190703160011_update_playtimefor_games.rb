class UpdatePlaytimeforGames < ActiveRecord::Migration[5.2]
  def change
    rename_column :games, :play_time, :min_play_time
    add_column :games, :max_play_time, :integer
  end
end
