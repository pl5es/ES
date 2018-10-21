# frozen_string_literal: true

require "rails_helper"

RSpec.describe BookmarksController, type: :routing do
  describe "routing" do
    it "routes to #show" do
      expect(get: "/api/users/bookmarks/1").to route_to("bookmarks#show", id: "1")
    end

    it "routes to #create" do
      expect(post: "/api/users/bookmarks").to route_to("bookmarks#create")
    end

    it "routes to #update via PUT" do
      expect(put: "/api/users/bookmarks/1").to route_to("bookmarks#update", id: "1")
    end
  end
end
