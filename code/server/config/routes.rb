# frozen_string_literal: true

Rails.application.routes.draw do
  resources :folders
  resources :bookmarks
  constraints format: :json do
    scope "api" do
      use_doorkeeper do
        skip_controllers :applications, :authorized_applications, :authorizations
      end

      resource :users, only: [:create, :show, :update] do
        resources :twitter, only: [:tweets]
        resources :posts, only: [:create, :show, :index]
        resources :folders, only: [:create, :show, :index, :update, :destroy] do
          resources :bookmarks, only: [:create, :show, :update, :destroy]
        end
        get "/twitter/tweets", to: "twitter#tweets"
        post "/twitter/post_tweet", to: "twitter#post_tweet"
      end

      post "/auth/twitter/reverse", to: "twitter#request_token"
      post "/auth/twitter", to: "twitter#oauth_verifier"


      post "/auth/orcid/reverse", to: "orcid#request_token"
    end
  end
end
