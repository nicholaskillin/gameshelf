class ChangeMinPlayTimeToInteger < ActiveRecord::Migration[5.2]
  def change
    change_column :games, :min_play_time, 'integer USING CAST(min_play_time AS integer)'
  end
end
