# frozen_string_literal: true

require "rails_helper"

RSpec.describe PostsController, type: :routing do
  describe "routing" do
    it "routes to #index" do
      expect(get: "/api/users/posts").to route_to("posts#index")
    end

    it "routes to #show" do
      expect(get: "/api/users/posts/1").to route_to("posts#show", id: "1")
    end

    it "routes to #create" do
      expect(post: "api/users/posts").to route_to("posts#create")
    end
  end
end
