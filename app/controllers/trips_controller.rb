class TripsController < ApplicationController
  def new
    @trip = Trip.new
    render "trips/_form", layout: false
  end

  def show
    @trip_object = Trip.find(params[:id])
    @trip = Trip.find(params[:id]).as_json
    @packing_lists = Trip.find(params[:id]).packing_lists.as_json
    @resource_lists = Trip.find(params[:id]).resource_lists.as_json
    @itinerary = Trip.find(params[:id]).itinerary.as_json
  end

  def create
    @user = current_user
      # if request.xhr?
      #   @trip = @user.trips.new(user: @user, city: params[:city], country: params[:country], start_date: params[:start_date], end_date: params[:end_date])
      #   if @trip.save?
      #     Itinerary.create(trip_id: @trip.id)
      #     render "trips/_new", layout: false, locals: {trip: @trip}
      #   else
      #     halt 422, "Oops, there was an error with the submission."
      #   end
      # else

        @trip = @user.trips.new(trip_params)
        if @trip.save
          Itinerary.create(trip_id: @trip.id)
          flash[:success] = "Trip Added!"
          redirect_to @trip
        else
          render '/users/show'
        end
      # end
  end

  def edit
    @trip = Trip.find_by(id: params[:id])
    render "trips/_form", layout: false
  end

  def update
    @user = current_user
    @trip = Trip.find_by(id: params[:id])

    if @trip.update(trip_params)
      flash[:success] = "Trip Updated!"
      redirect_to "/users/#{current_user.id}"
    else
      render "/trips/show"
    end
  end

  def destroy
    @trip = Trip.find_by(id: params[:id])
    @trip.destroy

    redirect_to "/users/#{current_user.id}"
  end

  private
    def trip_params
      params.require(:trip).permit(:city, :country, :start_date, :end_date)
    end
end
