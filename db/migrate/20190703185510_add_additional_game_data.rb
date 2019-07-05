class AddAdditionalGameData < ActiveRecord::Migration[5.2]
  def change
    add_column :games, :min_age, :integer
    add_column :games, :best_number_of_players, :integer
    add_column :games, :recommended_min_age, :integer
    add_column :games, :bgg_number, :integer
    add_column :games, :year_published, :integer
  end
end
