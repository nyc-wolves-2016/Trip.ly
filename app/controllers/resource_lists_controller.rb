class ResourceListsController < ApplicationController

  def create
    resource_list = ResourceList.new(list_params)
    if resource_list.save
      render json: resource_list.as_json
    else
      @errors = resource_list.errors.messages
    end
  end

  def show
    resource_list = ResourceList.find_by(id: params[:id])
    resources = resource_list.resources.as_json
    info = [resource_list.as_json, resources]
    render json: info
  end

  def update
    resource_list = ResourceList.find_by(id: params[:id])
    resource_list.update(list_params)
    resource_lists = Trip.find(params[:trip_id]).resource_lists.as_json
    render json: resource_lists
  end

  private
  def list_params
    params.require(:list).permit(:name, :trip_id)
  end

end
