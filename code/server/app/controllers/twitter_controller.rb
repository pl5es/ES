# frozen_string_literal: true

class TwitterController < ApplicationController
  before_action :set_user, only: [:index]
  skip_before_action :doorkeeper_authorize!, only: [:request_token, :oauth_verifier]

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

  def request_token
    consumer = OAuth::Consumer.new(ENV['TWITTER_CONSUMER_KEY'], ENV['TWITTER_CONSUMER_SECRET'],{
      site: 'https://api.twitter.com',
      request_token_path: '/oauth/request_token'
    })
    callback_url = 'http://localhost:3001'
    request_token = consumer.get_request_token(oauth_callback: callback_url)
    render json: request_token.params
  end

  def oauth_verifier
    consumer = OAuth::Consumer.new(ENV['TWITTER_CONSUMER_KEY'], ENV['TWITTER_CONSUMER_SECRET'],{
      site: 'https://api.twitter.com',
      access_token_path: '/oauth/access_token?oauth_verifier'
    })

    hash = { oauth_token: oauth_verifier_params[:oauth_token]}
    request_token  = OAuth::RequestToken.from_hash(consumer, hash)
    access_token = request_token.get_access_token(oauth_verifier: oauth_verifier_params[:oauth_verifier])
    render json: access_token.params
  end


  private
    def set_user
      @user = current_resource_owner
    end

    def tweet_params
      params.permit(:count)
    end

    def oauth_verifier_params
      params.permit(:oauth_verifier, :oauth_token)
    end
end
