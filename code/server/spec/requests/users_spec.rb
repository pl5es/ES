# frozen_string_literal: true

require "rails_helper"
require "awesome_print"

RSpec.describe "Users", type: :request do
  let!(:users) { create_list(:user, 1, interests_count: 5) }
  let!(:user_id) { users.first.id }
  let!(:token) do
    body = {
      "identifier" => users.first.username,
      "password" => "password",
      "grant_type" => "password"
    }
    post "http://localhost:3000/api/oauth/token", params: body
    json["access_token"]
  end
  let!(:headers) { { "Authorization" => "Bearer #{token}" } }

  describe "GET /api/users/1" do
    before do
      params = { format: :json }
      get "/api/users/#{user_id}", params: params, headers: headers
    end

    context "when the record exists" do
      it "returns user" do
        expect(json).not_to be_empty
        expect(json["id"]).to eq(user_id)
        expect(json.size).to eq(12)
      end

      it "returns status code 200" do
        expect(response).to have_http_status(200)
      end
    end

    context "when the record does not exist" do
      let(:user_id) { 100 }

      it "returns status code 404" do
        expect(response).to have_http_status(404)
      end

      it "returns a not found message" do
        expect(response.body).to match(/Couldn't find User with 'id'=#{user_id}/)
      end
    end
  end

  describe "POST /api/users" do
    let(:valid_attributes) do
      {
        description: Faker::Lorem.sentence(10),
        email: Faker::Internet.email,
        institution:  Faker::Educator.university,
        name:   Faker::Name.name,
        orcid:  Faker::Number.number(10),
        password: "password",
        research_area: Faker::Lorem.word,
        username: Faker::Internet.username,
        interests: (1..5).map { |i| Faker::Lorem.word },
        format: :json
      }
    end

    context "when the request is valid" do
      before do
        DatabaseCleaner.clean
        post "/api/users", params: valid_attributes
      end

      it "creates a user" do
        valid_attributes.except(:password, :format).stringify_keys.keys.each do |k|
          expect(json).to have_key(k)
        end
        expect(json["interests"].length).to be(5)
      end

      it "returns status code 201" do
        expect(response).to have_http_status(201)
      end
    end

    context "when the request is invalid" do
      before { post "/api/users", params: {} }

      it "returns status code 422" do
        expect(response).to have_http_status(422)
      end

      it "returns a validation failure message" do
        fields = [
          "password",
          "username",
          "email",
          "name",
          "orcid",
          "research_area",
          "institution"
        ]
        fields.each do |k|
          expect(json).to have_key(k)
        end
      end
    end
  end

  describe "PUT /api/users" do
    let(:valid_attributes) do
      {
        description: Faker::Lorem.sentence(10),
        email: Faker::Internet.email,
        institution:  Faker::Educator.university,
        name:   Faker::Name.name,
        orcid:  Faker::Number.number(10),
        password: "password",
        research_area: Faker::Lorem.word,
        username: Faker::Internet.username,
        interests: (1..2).map { |i| Faker::Lorem.word },
        format: :json
      }
    end

    context "when the request is valid" do
      before { put "/api/users", params: valid_attributes, headers: headers }

      it "update a user" do
        valid_attributes.except(:password, :format).stringify_keys.keys.each do |k|
          expect(json).to have_key(k)
        end
        expect(json["interests"].length).to be(2)
      end

      it "returns status code 200" do
        expect(response).to have_http_status(200)
      end
    end
  end
end
