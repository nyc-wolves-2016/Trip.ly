class PackingList < ApplicationRecord
  belongs_to :trip
  has_many :items

  validates :name, presence: true
end
