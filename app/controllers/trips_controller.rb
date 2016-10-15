class TripsController < ApplicationController

  def show
    @trip = Trip.find(params[:id]).as_json
    @packing_lists = Trip.find(params[:id]).packing_lists.as_json
    @resource_lists = Trip.find(params[:id]).resource_lists.as_json
    @itinerary = Trip.find(params[:id]).itineraries.as_json
  end

  def create

  end   

end
