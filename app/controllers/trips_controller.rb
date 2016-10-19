class TripsController < ApplicationController
  def new
    if !user_signed_in?
      not_found
    else
      @trip = Trip.new
      render "trips/_form", layout: false
    end
  end

  def show
    @trip_object = Trip.find_by(id: params[:id])
    @trip = @trip_object.as_json

    if !user_signed_in?
      not_found
    elsif @trip_object.user_id != current_user.id
      not_found
    end

    @packing_lists = Trip.find(params[:id]).packing_lists.as_json
    @resource_lists = Trip.find(params[:id]).resource_lists.as_json
    @itinerary = Trip.find(params[:id]).itinerary.as_json
  end

  def lists
    @trip = Trip.find_by(id: params[:id])
    if !user_signed_in?
      not_found
    elsif @trip.user_id != current_user.id
      not_found
    end

    packing_lists = @trip.packing_lists.as_json
    resource_lists = @trip.resource_lists.as_json
    itinerary = @trip.itinerary.as_json
    render json: {packing_lists: packing_lists, resource_lists: resource_lists, itinerary: itinerary}
  end

  def create
    if !user_signed_in?
      not_found
    else
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
  end

  def edit
    @trip = Trip.find_by(id: params[:id])
    if !user_signed_in?
      not_found
    elsif @trip.user_id != current_user.id
      not_found
    else
      render "trips/_form", layout: false
    end
  end

  def update

    if !user_signed_in?
      not_found
    end
    @user = current_user
    @trip = Trip.find_by(id: params[:id])
    if @trip.user_id != current_user.id
      not_found
    end

    if @trip.update(trip_params)
      flash[:success] = "Trip Updated!"
      redirect_to "/users/#{current_user.id}"
    else
      render "/trips/show"
    end
  end

  def destroy
    @trip = Trip.find_by(id: params[:id])
    if !user_signed_in?
      not_found
    elsif @trip.user_id != current_user.id
      not_found
    else
      @trip.destroy
    end

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
