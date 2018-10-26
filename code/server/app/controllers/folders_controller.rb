# frozen_string_literal: true

class FoldersController < ApplicationController
  before_action :set_folder, only: [:show, :update, :destroy]

  # GET /folders
  # GET /folders.json
  def index
    @folders = Folder.all
  end

  # GET /folders/1
  # GET /folders/1.json
  def show
  end

  # POST /folders
  # POST /folders.json
  def create
    @folder = Folder.new(folder_params)
    ap folder_params

    if @folder.save
      render :show, status: :created
    else
      render json: @folder.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /folders/1
  # PATCH/PUT /folders/1.json
  def update
    if @folder.update(folder_params)
      render :show, status: :ok
    else
      render json: @folder.errors, status: :unprocessable_entity
    end
  end

  # DELETE /folders/1
  # DELETE /folders/1.json
  def destroy
    @folder.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_folder
      begin
        @folder = Folder.find(params[:id])
      rescue ActiveRecord::RecordNotFound => e
        render json: {
          error: e.to_s
        }, status: :not_found
      end
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def folder_params
      params.permit(:title).merge(user_id: current_resource_owner.id)
    end
end
