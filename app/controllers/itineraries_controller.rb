class ItinerariesController < ApplicationController

  def index
    itinerary = Trip.find_by(id: params[:trip_id]).itinerary
    # events = itinerary.events.sort_by{|event| event.date }.as_json
      events = itinerary.events.map do |event|
        event_hash = {}
        event.attributes.each do |key, value|
          if key == "date"
            date = value.strftime("%a %b %e, %Y")
            event_hash[key] = date
          elsif key == "start_time" || key == "end_time"
            time = value.strftime("%l:%M %P")
            event_hash[key] = time
          else
            event_hash[key] = value
          end
        end
        event_hash
      end
      # binding.pry

        # ievents = itinerary.events.map do |event|
        #   date_time_hash = {}
        #   event.attributes.each do |key, value|
        #     binding.pry
        #     if key == "date"
        #       date_time_hash[key] = value.strftime("%a %b %e, %Y")
        #     elsif key == "start_time" || key == "end_time"
        #       date_time_hash[key] = value.strftime("%l:%M %P")
        #     end
        #   end
        #   date_time_hash
        # end

      # binding.pry
    # {|event| event.date = event.date.strftime("%a %b %e, %Y")}
    # itinerary.events.map do |event|
      # event_hash = {}
      # create a new hash for each event
      # stick in all the information except date and / or start time
      # merge in new key value pair with date/starttime: strftime
      # return that event_hash
    # end
    # binding.pry
    render json: events
  end

end
