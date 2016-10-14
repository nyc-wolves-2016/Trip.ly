class User < ApplicationRecord
  has_secure_password

  has_many :trips
  has_many :packing_lists, through: :trips
  has_many :resource_lists, through: :trips
  has_many :itineraries, through: :trips

  validates :first_name, :last_name, :email, presence: true
  validates :email, uniqueness: true
end
