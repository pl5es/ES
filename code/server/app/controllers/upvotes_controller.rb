# frozen_string_literal: true

class UpvotesController < ApplicationController
  before_action :set_upvote, only: [:show, :update, :destroy]

  # POST /upvotes
  # POST /upvotes.json
  def create
    @upvote = Upvote.new(user_id: current_resource_owner.id, post_id: params["post_id"])

    if @upvote.save
      render :show, status: :created
    else
      render json: @upvote.errors, status: :unprocessable_entity
    end
  end
end
