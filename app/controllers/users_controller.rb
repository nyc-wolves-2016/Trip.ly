class UsersController < ApplicationController
  def show
    @user = User.find(params[:user_id])
    if @user.id != current_user.id
      not_found
    end

    @trip = Trip.new
  end
end
