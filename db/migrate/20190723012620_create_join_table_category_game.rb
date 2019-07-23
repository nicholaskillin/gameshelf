class CreateJoinTableCategoryGame < ActiveRecord::Migration[5.2]
  def change
    create_join_table :Categories, :Games do |t|
      t.index [:category_id, :game_id]
      t.index [:game_id, :category_id]
    end
  end
end
