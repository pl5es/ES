class Api::UsersController < ApplicationController
  def create
    @user = User.new(user_params)
    if @user.save
      render json: @user.slice(:id, :username, :email, :description, :name, :ORCID, :research_area, :institution, :created_at)
    else
      render json: @user.errors
    end
  end

  def update
    @user = User.find(params[:id])
    if @user.update_attributes(user_params)
      render json: @user.info
    else
      render json: @user.errors
    end
  end

  def show
    @user = User.find(params[:id])
    render json: @user.info
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
