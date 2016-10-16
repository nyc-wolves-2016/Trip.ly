class ResourceList < ApplicationRecord
  belongs_to :trip
  has_many :resources, dependent: :destroy

  validates :name, presence: true
end
