class ResourceListsController < ApplicationController
  def show
    resource_list = ResourceList.find_by(id: params[:id])
    resources = resource_list.resources.as_json
    info = [resource_list.as_json, resources]
    render json: info
  end
end
