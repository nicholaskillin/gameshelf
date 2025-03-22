class AddActivatedIndexToUsers < ActiveRecord::Migration[7.0]
  def change
    add_index :users, :activated
  end
end
