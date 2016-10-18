class ResourcesController < ApplicationController

  def create
    resource = Resource.new(resource_params)
    if resource.save
      resource_list = ResourceList.find(resource.resource_list_id)
      trip = Trip.find(resource_list.trip_id)

      if !user_signed_in? || trip.user.id != current_user.id
        not_found
      end
      render json: resource.as_json
    else
      render json: @errors = resource.errors.messages, status: 422
    end
  end

  def show
    resource = Resource.find_by(id: params[:id]).as_json
    render json: resource
  end

  def update
    resource = Resource.find_by(id: params[:id])
<<<<<<< HEAD
    resource_list = ResourceList.find(resource.resource_list_id)
    trip = Trip.find(resource_list.trip_id)

    if !user_signed_in? || trip.user.id != current_user.id
      not_found
    end
    resource.update(resource_params)
    resources = ResourceList.find(params[:resource_list_id]).resources.as_json
    render json: resources
=======
    if resource.update(resource_params)
      resources = ResourceList.find(params[:resource_list_id]).resources.as_json
      render json: resources
    else
      render json: @errors = resource.errors.messages, status: 422
    end
>>>>>>> Add error handling for edit resource in resource list
  end

  def destroy
    resource = Resource.find_by(id: params[:id])
    resource_list = ResourceList.find(resource.resource_list_id)
    trip = Trip.find(resource_list.trip_id)

    if !user_signed_in? || trip.user.id != current_user.id
      not_found
    end
    resource.destroy
    render json: Resource.where(resource_list_id: params[:resource_list_id])
  end

  private
  def resource_params
    params.require(:resource).permit(:name, :details, :link, :resource_list_id)
  end
end
