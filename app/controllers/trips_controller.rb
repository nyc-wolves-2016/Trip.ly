class TripsController < ApplicationController
  def new
    @trip = Trip.new
  end

  def show
    @trip = Trip.find(params[:id]).as_json
    @packing_lists = Trip.find(params[:id]).packing_lists.as_json
    @resource_lists = Trip.find(params[:id]).resource_lists.as_json
    @itinerary = Trip.find(params[:id]).itineraries.as_json
  end

  def create
    @user = current_user
    @trip = @user.trips.new(trip_params)
    if @trip.save
      flash[:success] = "Trip Added!"
      redirect_to "/users/#{user.id}"
    else
      render "/users/show"
    end
  end

  private
    def trip_params
      params.require(:trip).permit(:city, :country, :start_date, :end_date)
    end
end
