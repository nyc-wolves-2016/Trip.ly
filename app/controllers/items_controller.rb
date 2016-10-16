class ItemsController < ApplicationController

  def create
    @item = Item.new(item_params)
    if @item.save
      render json: @item.as_json
    else
      @errors = @item.errors.messages
    end
  end

  private
    def item_params
      params.require(:item).permit(:name, :packing_list_id)
    end

end
