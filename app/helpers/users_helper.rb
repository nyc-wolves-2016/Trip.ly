module UsersHelper
  def past_trips(user)
    trips = user.trips
    trips.select { |trip| trip.end_date < Time.now }
  end

  def upcoming_trips(user)
    trips = user.trips
    trips.select { |trip| trip.end_date > Time.now }
  end
end
