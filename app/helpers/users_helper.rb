module UsersHelper
  def past_trips(user)
    trips = user.trips
    trips.select do |trip|
      if trip.end_date?
        trip.end_date < Time.now
      end
    end
  end

  def upcoming_trips(user)
    trips = user.trips
    trips.select do |trip|
      if trip.end_date?
        trip.end_date > Time.now
      end
    end
  end
end
