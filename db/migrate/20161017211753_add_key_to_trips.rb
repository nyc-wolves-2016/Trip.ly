class AddKeyToTrips < ActiveRecord::Migration[5.0]
  def change
    add_column :trips, :key, :string
  end
end
