class ResourceList < ApplicationRecord
  belongs_to :trip
  has_many :resources

  validates :name, presence: true
end
