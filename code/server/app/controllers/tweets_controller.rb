# frozen_string_literal: true

class TweetsController < ApplicationController
  before_action :set_user, only: [:index]

  # GET /tweets
  # GET /tweets.json
  def index
    number_tweets = if params["count"] then params["count"].to_i else 10 end
    tweet_ids = []
    if @user.interests
      for i in 1..number_tweets
        interest = @user.interests.sample
        tweet = Rails.application.config.twitter_client.search("#{interest[:hashtag]}", count: 1).take(1)
        tweet_ids.push(tweet.first.id.to_s)
      end
    end

    render json: tweet_ids, status: :ok
  end

  def login
      render json: "hello"
  end

  def token
      @info = auth_hash
      render json: info
  end
  



  private
    def set_user
      @user = current_resource_owner
    end

    def tweet_params
      params.permit(:count)
    end

    protected

  def auth_hash
    request.env['omniauth.auth']
  end
end
