# frozen_string_literal: true

class UsersController < ApplicationController
  skip_before_action :doorkeeper_authorize!, only: [:create]
  before_action :set_user, only: [:update, :show]

  def create
    params = user_params
    @user = User.new(params.except(:interests))

    if @user.save
      Interest.associate(@user, user_params[:interests]) if params[:interests]
      render :create, status: :created
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  def update
    params = user_params
    if @user.update_attributes(params.except(:interests))
      Interest.associate(@user, params[:interests]) if params[:interests]
      render :create, status: :ok
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  def show
    render :create, status: :ok
  end

  private

    def set_user
      @user = current_resource_owner
    end

    def user_params
      params.permit(
        :username,
        :name,
        :password,
        :email,
        :description,
        :orcid,
        :orcid_access_token,
        :research_area,
        :institution,
        :avatar,
        :twitter_user_id,
        :twitter_oauth_token,
        :twitter_oauth_token_secret,
        interests: []
      )
    end
end
