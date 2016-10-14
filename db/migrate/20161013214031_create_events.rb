class CreateEvents < ActiveRecord::Migration[5.0]
  def change
    create_table :events do |t|
      t.string :name,  null: false
      t.string :location
      t.text :details
      t.text :contact_info
      t.date :date, null: false
      t.time :start_time
      t.time :end_time
      t.references :itinerary

      t.timestamps
    end
  end
end
