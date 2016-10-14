class Item < ApplicationRecord
  belongs_to :packing_list

  validates :name, presence: true
end
