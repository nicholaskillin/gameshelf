class CreateGames < ActiveRecord::Migration[5.2]
  def change
    create_table :games do |t|
      t.references :user, foreign_key: true
      t.string :title
      t.time :play_time
      t.integer :min_players
      t.integer :max_players
      t.text :description
      t.string :image
      t.string :rules_url
      t.string :playthrough_url

      t.timestamps
    end
  end
end
