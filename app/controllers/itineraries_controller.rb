class ItinerariesController < ApplicationController

  def index
    itinerary = Trip.find_by(id: params[:trip_id]).itinerary
    events = itinerary.events.sort_by{|event| event.date }.as_json
    render json: events
  end

end
