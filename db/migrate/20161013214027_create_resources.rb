class CreateResources < ActiveRecord::Migration[5.0]
  def change
    create_table :resources do |t|
      t.string :name, null: false
      t.text :details
      t.string :link
      t.references :resource_list

      t.timestamps
    end
  end
end
