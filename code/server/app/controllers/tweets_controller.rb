# frozen_string_literal: true

class TweetsController < ApplicationController
  include HTTParty
  before_action :set_user, only: [:index]
  skip_before_action :doorkeeper_authorize!, only: [:callback]
  base_uri 'https://api.twitter.com/oauth/'

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

  def tweet
      client = Rails.application.config.twitter_client
      message = params[:message]
      a = client.update(message)
      byebug
      render status: 200
  end


  private
    def set_user
      @user = current_resource_owner
    end

    def tweet_params
      params.permit(:count)
    end

end
