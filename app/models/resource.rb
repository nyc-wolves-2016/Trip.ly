class Resource < ApplicationRecord
  belongs_to :resource_list

  validates :name, presence: true
  validates :link,  format: { with: /\A#{URI::regexp(['http', 'https'])}\z/,
    message: "must begin with http:// or https://" }
end
