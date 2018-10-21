# frozen_string_literal: true

# require "rails_helper"

# RSpec.describe "Bookmarks", type: :request do
# let!(:user) { create(:user, interests_count: 5) }
# let!(:bookmarks) { create_list(:bookmark, 4, interests_count: 3, user_id: user.id) }
# let!(:bookmark_id) { bookmarks.first.id }
# let!(:token) do
# body = {
# "identifier" => user.username,
# "password" => "password",
# "grant_type" => "password"
# }
# post "/api/oauth/token", params: body
# json["access_token"]
# end
# let!(:headers) { { "Authorization" => "Bearer #{token}" } }

# describe "POST /api/users/bookmars" do
# let(:valid_attributes) do
# {
# title: Faker::Lorem.word,
# url: Faker::Internet.url,
# interests: (1..10).map { |i| Faker::Lorem.word },
# format: :json
# }
# end

# context "when the request is valid" do
# before { post "/api/users/bookmarks", params: valid_attributes, headers: headers }

# it "creates a bookmark" do
# valid_attributes.except(:format).stringify_keys.keys.each do |k|
# expect(json).to have_key(k)
# end
# expect(json.size).to be(6)
# expect(json["interests"].length).to be(10)
# end

# it "returns status code 201" do
# expect(response).to have_http_status(201)
# end
# end

# context "when the request is invalid" do
# before { post "/api/users/bookmarks", params: {}, headers: headers }

# it "returns status code 422" do
# expect(response).to have_http_status(422)
# end

# it "returns a validation failure message" do
# fields = [
# "title",
# "url"
# ]
# fields.each do |k|
# expect(json).to have_key(k)
# end
# end
# end
# end

# describe "GET/api/users/bookmarks/:id" do
# before { get "/api/users/bookmarks/#{bookmark_id}", params: { format: :json }, headers: headers }

# context "when a record exists " do
# it "returns the bookmark" do
# expect(json).not_to be_empty
# expect(json.size).to be(6)
# expect(json["id"]).to be(bookmark_id)
# end
# end

# context "when a record does not exist" do
# let(:bookmark_id) { 100 }

# it "returns status code 404" do
# expect(response).to have_http_status(404)
# end

# it "returns a not found message" do
# expect(json["error"]).to match(/Couldn't find Bookmark with 'id'=#{bookmark_id}/)
# end
# end
# end
# end
