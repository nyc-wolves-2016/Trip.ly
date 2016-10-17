class ResourcesController < ApplicationController

  def create
    resource = Resource.new(resource_params)
    if resource.save
      render json: resource.as_json
    else
      @errors = resource.errors.messages
    end
  end

  def show
    resource = Resource.find_by(id: params[:id]).as_json
    render json: resource 
  end

  def update
    resource = Resource.find_by(id: params[:id])
    resource.update(resource_params)
    resources = ResourceList.find(params[:resource_list_id]).resources.as_json
    render json: resources
  end


  private
  def resource_params
    params.require(:resource).permit(:name, :details, :link, :resource_list_id)
  end
end
