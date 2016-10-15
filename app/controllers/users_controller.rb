class UsersController < ApplicationController
  def show
    @user = User.find(params[:user_id])
    @trip = Trip.new
  end
end
