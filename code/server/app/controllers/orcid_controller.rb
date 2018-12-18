class OrcidController < ApplicationController
  def request_token
    code = params[:code]
    response = HTTParty.get('http://api.stackexchange.com/2.2/questions?site=stackoverflow')
    puts response.body
  end
end
