class ItemsController < ApplicationController

  def create
    @item = Item.new(item_params)
    if @item.save
      render json: @item.as_json
    else
      render json: { errors: @item.errors.messages }, status: 422
    end
  end

  def show
    item = Item.find_by(id: params[:id])
    render json: item
  end

  def update
    item = Item.find(params[:id])
    item.update(item_params)
    items = PackingList.find(params[:packing_list_id]).items.as_json
    render json: items
  end

  def destroy
    @item = Item.find(params[:id])
    @item.destroy
    render json: Item.where(packing_list_id: params[:packing_list_id])
  end

  private
    def item_params
      params.require(:item).permit(:name, :packing_list_id)
    end

end
