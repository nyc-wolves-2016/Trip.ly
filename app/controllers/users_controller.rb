class UsersController < ApplicationController
  def show
    @user = User.find(params[:user_id])
    @trip = Trip.new
  end

  def google
    # binding.pry
    @user = current_user
    if @user.provider != nil && @user.uid != nil
      render json: @user.as_json
    else
      return false
    end
  end
end
