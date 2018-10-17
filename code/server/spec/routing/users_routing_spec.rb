# frozen_string_literal: true

require "rails_helper"

RSpec.describe UsersController, type: :routing do
  describe "routing" do
    it "routes to #show" do
      expect(get: "/api/users").to route_to("users#show")
    end

    it "routes to #create" do
      expect(post: "/api/users").to route_to("users#create")
    end

    it "routes to #update via PUT" do
      expect(put: "/api/users").to route_to("users#update")
    end
  end
end
