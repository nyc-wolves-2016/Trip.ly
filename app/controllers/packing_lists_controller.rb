class PackingListsController < ApplicationController

  def create
    @list = PackingList.new(list_params)
    if @list.save
      render json: @list.as_json
    else
      render json: { errors: @list.errors.messages }, status: 422
    end
  end

  def show
    packing_list = PackingList.find_by(id: params[:id])
    items = packing_list.items.as_json
    info = [packing_list.as_json, items]
    render json: info
  end

  def update
    packing_list = PackingList.find(params[:id])
    packing_list.update(list_params)
    packing_lists = Trip.find(params[:trip_id]).packing_lists
    render json: packing_lists
  end

  def destroy
    @list = PackingList.find(params[:id])
    @list.destroy
    render json: PackingList.where(trip_id: params[:trip_id])
  end

  private
    def list_params
      params.require(:list).permit(:name, :trip_id)
    end

end
