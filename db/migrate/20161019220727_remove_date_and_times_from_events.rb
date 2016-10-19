class RemoveDateAndTimesFromEvents < ActiveRecord::Migration[5.0]
  def change
    remove_column :events, :date, :date
    remove_column :events, :start_time, :time
    remove_column :events, :end_time, :time
  end
end
