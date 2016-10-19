class ItinerariesController < ApplicationController

  def index
    itinerary = Trip.find_by(id: params[:trip_id]).itinerary
    # events = itinerary.events.sort_by{|event| event.date }.as_json
      events = itinerary.events.sort_by{ |event| event.start_time }.map do |event|
        event_hash = {}
        event.attributes.each do |key, value|
          if key == "start_time"
            date = value.strftime("%a %b %e, %Y")
            time = value.strftime("%l:%M %P")
            event_hash[key] = time
            event_hash[:start_date] = date
          elsif key == "end_time"
            time = value.strftime("%l:%M %P")
            event_hash[key] = time
          else
            event_hash[key] = value
          end
        end
        event_hash
      end

    render json: events
  end

end
