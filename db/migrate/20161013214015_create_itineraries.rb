class CreateItineraries < ActiveRecord::Migration[5.0]
  def change
    create_table :itineraries do |t|
      t.references :trip

      t.timestamps
    end
  end
end
