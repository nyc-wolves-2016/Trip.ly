class Trip < ApplicationRecord
  belongs_to :user

  has_many :packing_lists, dependent: :destroy
  has_many :resource_lists, dependent: :destroy
  has_one :itinerary, dependent: :destroy

  validates :city, :start_date, :end_date, presence: true
  validates :key, uniqueness: true

  after_create :generate_key

  def all_resources
    all_resources = []
    self.resource_lists.each do |list|
      list.resources.each do |resource|
        all_resources << resource
      end
    end
    all_resources
  end

private

  def generate_key
    update_column :key, SecureRandom.hex(5)
  rescue ActiveRecord::RecordNotUnique => e
    token_attempts ||= 0
    token_attempts += 1
    retry if token_attempts < 5
    raise e, "Retries exhausted"
  end

end
