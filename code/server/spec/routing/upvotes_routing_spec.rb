# frozen_string_literal: true

require "rails_helper"

RSpec.describe UpvotesController, type: :routing do
  describe "routing" do
    it "routes to #create" do
      expect(post: "api/users/posts/1/upvotes").to route_to("upvotes#create", post_id: "1")
    end
  end
end
