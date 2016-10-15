class PackingListsController < ApplicationController

  def show
    packing_list = PackingList.find_by(id: params[:id])
    items = packing_list.items.as_json
    info = [packing_list.as_json, items]
    render json: info
  end

end
