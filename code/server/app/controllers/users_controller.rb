# frozen_string_literal: true

class UsersController < ApplicationController
  skip_before_action :doorkeeper_authorize!, only: [:create]

  def create
    params = user_params
    @user = User.new(params.except(:interests))

    if @user.save
      Interest.associate(@user, params[:interests])
      render :create, status: :created
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  def update
    params = user_params
    @user = current_resource_owner
    if @user.update_attributes(params.except(:interests))
      Interest.associate(@user, params[:interests]) if params[:interests]
      render :create, status: :ok
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  def show
    @user = User.find(current_resource_owner.id)
    render :create, status: :ok
  end

  private

    def user_params
      params.permit(
        :username,
        :name,
        :password,
        :email,
        :description,
        :orcid,
        :research_area,
        :institution,
        :avatar,
        :user_id,
        interests: []
      )
    end
end
