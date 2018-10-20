# frozen_string_literal: true

class BookmarksController < ApplicationController
  before_action :set_bookmark, only: [:show, :update, :destroy]

  # GET /bookmarks
  # GET /bookmarks.json
  def index
    @bookmarks = Bookmark.all
  end

  # GET /bookmarks/1
  # GET /bookmarks/1.json
  def show
  end

  # POST /bookmarks
  # POST /bookmarks.json
  def create
    @bookmark = Bookmark.new(bookmark_params.except(:interests))

    if @bookmark.save
      Interest.associate(@bookmark, bookmark_params[:interests])
      render :show, status: :created
    else
      render json: @bookmark.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /bookmarks/1
  # PATCH/PUT /bookmarks/1.json
  def update
    if @bookmark.update(bookmark_params.except(:interests))
      Interest.associate(@bookmark, bookmark_params["interests"])
      render :show, status: :ok
    else
      render json: @bookmark.errors, status: :unprocessable_entity
    end
  end

  # DELETE /bookmarks/1
  # DELETE /bookmarks/1.json
  def destroy
    @bookmark.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_bookmark
      @bookmark = Bookmark.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def bookmark_params
      params.fetch(:bookmark, {})
      params.permit(:name, interests: [])
    end
end
