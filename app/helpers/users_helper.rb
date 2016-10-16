module UsersHelper
  def past_trips(user)
    trips = user.trips
    trips.select do |trip|
      trip.end_date < Time.now if trip.end_date?

    end
  end

  def upcoming_trips(user)
    trips = user.trips
    trips.select do |trip|
      trip.end_date > Time.now if trip.end_date?
    end
  end
end
