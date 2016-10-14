class Trip < ApplicationRecord
  belongs_to :user

  has_many :packing_lists
  has_many :resource_lists
  has_many :itineraries

  validates :city, :start_date, :end_date, presence: true
end
