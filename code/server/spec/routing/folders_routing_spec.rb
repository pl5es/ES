require "rails_helper"

RSpec.describe FoldersController, type: :routing do
  describe "routing" do
    it "routes to #index" do
      expect(:get => "/folders").to route_to("folders#index")
    end

    it "routes to #show" do
      expect(:get => "/folders/1").to route_to("folders#show", :id => "1")
    end


    it "routes to #create" do
      expect(:post => "/folders").to route_to("folders#create")
    end

    it "routes to #update via PUT" do
      expect(:put => "/folders/1").to route_to("folders#update", :id => "1")
    end

    it "routes to #update via PATCH" do
      expect(:patch => "/folders/1").to route_to("folders#update", :id => "1")
    end

    it "routes to #destroy" do
      expect(:delete => "/folders/1").to route_to("folders#destroy", :id => "1")
    end
  end
end
