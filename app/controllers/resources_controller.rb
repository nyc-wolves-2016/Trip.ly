class ResourcesController < ApplicationController

  def create
    resource = Resource.new(resource_params)
    if resource.save
      render json: resource.as_json
    else
      @errors = resource.errors.messages
    end
  end

  private
  def resource_params
    params.require(:resource).permit(:name, :details, :link, :resource_list_id)
  end
end
