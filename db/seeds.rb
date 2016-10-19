past_start = Date.parse("3rd Feb 2016")
past_end = Date.parse("15th Feb 2016")

upcoming_start = Date.parse("3rd Feb 2017")
upcoming_end = Date.parse("15th Feb 2017")

soon_start = Date.parse("16th Oct 2016")
soon_end = Date.parse("27th Oct 2016")

cities = ["Milan, IT", "San Pedro de Macoris", "Glastonbury, Connecticut, US", "Florence, IT", "Venice, California, US", "Turin, IT", "Alba, IT", "Naples, IT", "Lecce, IT"]

2.times { User.create!(first_name: Faker::Name.first_name, last_name: Faker::Name.last_name, password: "password", email: Faker::Internet.email)}

4.times {Trip.create!(user_id: rand(1..2), city: cities.sample, start_date: past_start, end_date: past_end ) }

4.times {Trip.create!(user_id: rand(1..2), city: cities.sample, start_date: upcoming_start, end_date: upcoming_end ) }

4.times {Trip.create!(user_id: rand(1..2), city: cities.sample, start_date: soon_start, end_date: soon_end ) }

trips = Trip.all

trips.each do |trip|
  3.times {PackingList.create!(trip: trip, name: Faker::Commerce.department(1, true))}
  3.times {ResourceList.create!(trip: trip, name: Faker::Lorem.word)}
  Itinerary.create!(trip: trip)
end

trips.each  do |trip|
  trip.packing_lists.each do |list|
    5.times { Item.create!(packing_list: list, name: Faker::Commerce.product_name) }
  end
  trip.resource_lists.each do |list|
    5.times { Resource.create!(resource_list: list, name: Faker::Hipster.sentence(3), link: "http://kayak.com", details: Faker::Lorem.sentence(3)) }
  end

end

Itinerary.all.each do |itinerary|
    2.times { Event.create!(itinerary: itinerary, name: Faker::GameOfThrones.city, location: Faker::Address.street_address, details: Faker::Address.street_address, start_time: Faker::Time.between(3.days.ago, Date.today, :all), end_time: Faker::Time.between(2.days.ago, Date.today, :all)) }
end
