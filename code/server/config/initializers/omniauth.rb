Rails.application.config.middleware.use OmniAuth::Builder do
    api_key = ENV["TWITTER_CONSUMER_KEY"]
    api_secret = ENV["TWITTER_CONSUMER_SECRET"]
    puts api_key
    provider :twitter, api_key, api_secret
end
