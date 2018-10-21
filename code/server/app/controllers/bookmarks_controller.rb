# frozen_string_literal: true

class BookmarksController < ApplicationController
  before_action :set_bookmark, only: [:show, :update, :destroy]

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

  def destroy
    @bookmark.destroy
  end

  private
    def set_bookmark
      begin
        @bookmark = Bookmark.find(params[:id])
      rescue ActiveRecord::RecordNotFound => e
        render json: {
          error: e.to_s
        }, status: :not_found
      end
    end

    def bookmark_params
      params.permit(:title, :url, interests: []).merge(user_id: current_resource_owner.id)
    end
end
