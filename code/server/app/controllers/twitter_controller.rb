# frozen_string_literal: true

class TwitterController < ApplicationController
  before_action :set_user, only: [:tweets, :post_tweet]
  skip_before_action :doorkeeper_authorize!, only: [:request_token, :oauth_verifier]

  def tweets
    number_tweets = if params["count"] then params["count"].to_i else 10 end
    tweets_ids = []
    cache = {}
    if @user.interests.any?
      for i in 1..number_tweets
        interest = @user.interests.sample
        interest_tweets = cache.fetch(interest) { |i| cache[i] = fetch_from_twitter(number_tweets, interest.hashtag) }
        id = interest_tweets.sample
        tweets_ids.push(id)
        interest_tweets.delete(id)
      end
    end

    render json: tweets_ids, status: :ok
  end

  def post_tweet
    @user.twitter.update(params[:message])
    head :no_content
  end

  def request_token
    consumer = OAuth::Consumer.new(ENV["TWITTER_CONSUMER_KEY"], ENV["TWITTER_CONSUMER_SECRET"],
                                   site: "https://api.twitter.com",
                                   request_token_path: "/oauth/request_token"
                                  )
    callback_url = ENV["TWITTER_CALLBACK_URL"]
    request_token = consumer.get_request_token(oauth_callback: callback_url)
    render json: request_token.params
  end

  def oauth_verifier
    consumer = OAuth::Consumer.new(ENV["TWITTER_CONSUMER_KEY"], ENV["TWITTER_CONSUMER_SECRET"],
                                   site: "https://api.twitter.com",
                                   access_token_path: "/oauth/access_token?oauth_verifier"
                                  )

    hash = { oauth_token: oauth_verifier_params[:oauth_token] }
    request_token = OAuth::RequestToken.from_hash(consumer, hash)
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

    def fetch_from_twitter(count, query)
      ap query
      ids = []
      tweets = Rails.application.config.twitter_client.search("#{query}", count: count).to_h[:statuses]
      tweets.each { |t| ids.push(t[:id_str]) }
      ids
    end
end
