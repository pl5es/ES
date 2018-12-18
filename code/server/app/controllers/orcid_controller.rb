require 'net/https'
require 'net/http'
require 'uri'
require 'json'

class OrcidController < ApplicationController
  def request_token
    url = "https://orcid.org/oauth/token?client_id=APP-D7HK0ZRV7DLASQHI&client_secret=696a5ad5-faa5-46aa-9a7b-7ae3240827fd&grant_type=authorization_code&redirect_uri=http://localhost:3001/auth/orcid/callback&code=#{params[:code]}"
    header = {'Content-Type': 'application/x-www-form-urlencoded'}

    uri = URI.parse(url)

    https = Net::HTTP.new(uri.host, uri.port)
    https.use_ssl = true
    req = Net::HTTP::Post.new(uri.path, initheader = header)
    request = Net::HTTP::Post.new(uri.request_uri, header)
    response = https.request(request)

    render json: JSON.parse(response.body), status: :ok
  end
end
