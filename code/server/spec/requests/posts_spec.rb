# frozen_string_literal: true

require "rails_helper"

RSpec.describe "Posts", type: :request do
  let!(:user) { create(:user, interests_count: 5) }
  let!(:posts) { create_list(:post, 4, interests_count: 3, userid: user.id) }
  let!(:post_id) { posts.first.id }
  let!(:token) do
    body = {
      "identifier" => user.username,
      "password" => "password",
      "grant_type" => "password"
    }
    post "/api/oauth/token", params: body
    json["access_token"]
  end
  let!(:headers) { { "Authorization" => "Bearer #{token}" } }

  describe "GET /api/users/posts" do
    before do
      params = { format: :json }
      get "/api/users/posts", params: params, headers: headers
    end

    context "valid request" do
      it "returns all posts by a user" do
        expect(json).not_to be_empty
        expect(json.first["id"]).to eq(posts.first.id)
        expect(json.size). to eq(4)
      end
    end
  end

  describe "GET /api/users/posts/:id" do
    before { get "/api/users/posts/#{post_id}", params: { format: :json }, headers: headers }

    context "when a record exists " do
      it "returns the post" do
        expect(json).not_to be_empty
        expect(json.size).to be(6)
        expect(json["id"]).to be(post_id)
      end
    end

    context "when a record does not exist" do
      let(:post_id) { 100 }

      it "returns status code 404" do
        expect(response).to have_http_status(404)
      end

      it "returns a not found message" do
        expect(json["error"]).to match(/Couldn't find Post with 'id'=#{post_id}/)
      end
    end
  end

  describe "POST /api/users/posts" do
    let(:valid_attributes) do
      {
        content: Faker::Lorem.sentence(10),
        interests: (1..7).map { |i| Faker::Lorem.word },
        format: :json
      }
    end

    context "valid request" do
      before { post "/api/users/posts", params: valid_attributes, headers: headers }

      it "creates a post" do
        valid_attributes.except(:format).stringify_keys.keys.each do |k|
          expect(json).to have_key(k)
        end
        expect(json.size).to be(5)
        expect(json["interests"].length).to be(7)
      end

      it "returns status code 201" do
        expect(response).to have_http_status(201)
      end
    end

    context "when the request is invalid" do
      before { post "/api/users/posts", params: {}, headers: headers }

      it "returns status code 422" do
        expect(response).to have_http_status(422)
      end

      it "returns a validation failure message" do
        fields = [
          "content"
        ]
        fields.each do |k|
          expect(json).to have_key(k)
        end
      end
    end
  end
end
