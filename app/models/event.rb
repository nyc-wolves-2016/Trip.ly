class Event < ApplicationRecord
  belongs_to :itinerary

  validates :name, :start_time, :end_time, :location, :details, presence: true
end
