class TripsController < ApplicationController
  def new
    @trip = Trip.new
    render "trips/_form", layout: false
  end

  def show
    # binding.pry
    if user_signed_in?
      @user = current_user
    end

    @trip_object = Trip.find(params[:id])
    @trip = Trip.find(params[:id]).as_json

    if @user
        @owner = Trip.find_by(user_id: @user.id).user
    end


    if @owner
      if current_user.id != @owner.id
        not_found
      end
    end
    @packing_lists = Trip.find(params[:id]).packing_lists.as_json
    @resource_lists = Trip.find(params[:id]).resource_lists.as_json
    @itinerary = Trip.find(params[:id]).itinerary.as_json
  end

  def create
    @user = current_user
        @trip = @user.trips.new(trip_params)
        if @trip.save
          Itinerary.create(trip_id: @trip.id)
          flash[:success] = "Trip Added!"
          redirect_to @trip
        else
          render '/users/show'
        end
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

  def share
    @trip = Trip.find_by(key: params[:key])
    @itinerary = @trip.itinerary.as_json
    @resources = @trip.all_resources.as_json
  end

  private
    def trip_params
      params.require(:trip).permit(:city, :country, :start_date, :end_date)
    end
end
