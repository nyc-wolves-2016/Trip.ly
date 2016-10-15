class EventsController < ApplicationController

  def create
    @event = Event.new(event_params)
    if @event.save
      if request.xhr?
        render json: @event.as_json
      else
        redirect_to root_path
      end
    else
      @errors = @event.errors.messages
    end
  end

  private
  def event_params
    params.require(:event).permit(:name, :location, :details, :contact_info, :date, :start_time, :end_time, :itinerary_id)
  end

end
