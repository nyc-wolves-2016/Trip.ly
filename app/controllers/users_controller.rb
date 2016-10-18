class UsersController < ApplicationController
  def show
    @user = User.find(params[:user_id])
    if !user_signed_in?
      not_found
    elsif @user.id != current_user.id
      not_found
    end

    @trip = Trip.new
  end
end
