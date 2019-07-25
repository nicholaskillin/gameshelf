class CreateJoinTableGamesMechanics < ActiveRecord::Migration[5.2]
  def change
    create_join_table :games, :mechanics do |t|
      t.index [:game_id, :mechanic_id]
      t.index [:mechanic_id, :game_id]
    end
  end
end
