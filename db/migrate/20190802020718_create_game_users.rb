class CreateGameUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :game_users do |t|
      t.belongs_to :user, index: true
      t.belongs_to :game, index: true
      t.string :rules_video
      t.boolean :available, default: true

      t.timestamps
    end
  end
end
