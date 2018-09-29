class UsersController < ApplicationController
  skip_before_action :doorkeeper_authorize!, only: [:create]

  def create
    @user = User.new(user_params)
    byebug
    if @user.save
      render json: @user.slice(:id, :username, :email, :description, :name, :ORCID, :research_area, :institution, :created_at)
    else
      render json: @user.errors
    end
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
    params.permit(:username, :name, :password, :email, :description, :ORCID, :research_area, :institution, :interests)
  end

end
