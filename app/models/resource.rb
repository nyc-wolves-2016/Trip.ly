class Resource < ApplicationRecord
  belongs_to :resource_list

  validates :name, presence: true
end
