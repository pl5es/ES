# frozen_string_literal: true

require "rails_helper"

RSpec.describe BookmarksController, type: :routing do
  describe "routing" do
    it "routes to #show" do
      expect(get: "/api/users/folders/1/bookmarks/1").to route_to("bookmarks#show", folder_id: "1", id: "1")
    end

    it "routes to #create" do
      expect(post: "/api/users/folders/1/bookmarks").to route_to("bookmarks#create", folder_id: "1")
    end

    it "routes to #update via PUT" do
      expect(put: "/api/users/folders/1/bookmarks/1").to route_to("bookmarks#update", folder_id: "1", id: "1")
    end
  end
end
