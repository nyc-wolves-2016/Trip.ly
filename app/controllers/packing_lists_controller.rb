class PackingListsController < ApplicationController

  def show
    packing_list = PackingList.find_by(id: params[:id])
    items = packing_list.items.as_json
    info = [packing_list.as_json, items]
    render json: info
  end

  def create
    @list = PackingList.new(list_params)
    if @list.save
      render json: @list.as_json
    else
      @errors = @list.errors.messages
    end
  end

  private
    def list_params
      params.require(:list).permit(:name, :trip_id)
    end

end
