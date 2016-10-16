class PackingList < ApplicationRecord
  belongs_to :trip
  has_many :items, dependent: :destroy

  validates :name, presence: true
end
