class CreateItems < ActiveRecord::Migration[5.0]
  def change
    create_table :items do |t|
      t.string :name, null: false
      t.boolean :packed, default: false
      t.references :packing_list

      t.timestamps
    end
  end
end
