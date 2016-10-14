class Event < ApplicationRecord
  belongs_to :itinerary

  validates :name, :date, presence: true
end
