class UsersController < ApplicationController
  skip_before_action :doorkeeper_authorize!, only: [:create]

  def create
    params = user_params
    @user = User.new(params.except(:interests))

    unless @user.save
      render json: @user.errors
    end

    if params["interests"]
      params["interests"].each do |interest|
        Interest.create(hashtag: interest, user_id: @user.id)
      end
    end

    render json: @user.info
  end

  def update
    if current_resource_owner.update_attributes(user_params)
      render json: current_resource_owner.info
    else
      render json: current_resource_owner.errors
    end
  end

  def show
    render json: current_resource_owner.info
  end

  def index
    @users = User.all
    render json: @users.attributes.map {|u| u.info}
  end

  private

  def user_params
    params.permit(:username, :name, :password, :email, :description, :orcid, :research_area, :institution, interests: [])
  end

end
