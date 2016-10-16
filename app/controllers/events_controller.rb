class EventsController < ApplicationController

  def create
    @event = Event.new(event_params)
    if @event.save
        render json: @event.as_json
    else
      @errors = @event.errors.messages
    end
  end

  def show
    @event = Event.find_by(id: params[:id])
    render json: @event.as_json
  end

  def update
    @event = Event.find_by(id: params[:id])
    if @event
      @event.update_attributes(event_params)
      render json: @event.as_json
    else
      @errors = @event.errors.messages
    end
  end

  private
  def event_params
    params.require(:event).permit(:name, :location, :details, :contact_info, :date, :start_time, :end_time, :itinerary_id)
  end

end
