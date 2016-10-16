class Trip < ApplicationRecord
  belongs_to :user

  has_many :packing_lists, dependent: :destroy
  has_many :resource_lists, dependent: :destroy
  has_one :itinerary, dependent: :destroy

  validates :city, :start_date, :end_date, presence: true



end
