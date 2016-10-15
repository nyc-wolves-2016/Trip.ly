class ItinerariesController < ApplicationController

  def show
    itinerary = Trip.find_by(id: params[:trip_id]).itinerary
    events = itinerary.events.as_json
    render json: events
  end

end
