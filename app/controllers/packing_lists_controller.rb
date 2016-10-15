class PackingListsController < ApplicationController

  def show
    packing_list = PackingList.find_by(id: params[:id])
    items = packing_list.items.as_json
    render json: items
  end   

end
