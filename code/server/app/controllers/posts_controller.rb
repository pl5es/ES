# frozen_string_literal: true

class PostsController < ApplicationController
  before_action :set_post, only: [:show]

  # GET /posts
  def index
    @posts = Post.all

    render json: @posts
  end

  # GET /posts/1
  def show
    render :show
  end

  # POST /posts
  def create
    @post = Post.new(post_params.except(:interests))

    if post_params["user_id"] != current_resource_owner.id
      render json: { error: "can't create posts for other users" }, status: :unauthorized
    elsif @post.save
      Interest.associate(@post, post_params["interests"])
      render :create, status: :created
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  private

    def set_post
      begin
        @post = Post.find(params[:id])
      rescue ActiveRecord::RecordNotFound => e
        render json: {
          error: e.to_s
        }, status: :not_found
      end
    end

    def post_params
      params.permit(:content, interests: []).merge(user_id: current_resource_owner.id)
    end
end
