class CreateMechanics < ActiveRecord::Migration[5.2]
  def change
    create_table :mechanics do |t|
      t.string :name
      t.bigint :bgg_id

      t.timestamps
    end
  end
end
