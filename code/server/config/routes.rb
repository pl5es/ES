# frozen_string_literal: true

Rails.application.routes.draw do
  constraints format: :json do
    scope "api" do
      use_doorkeeper do
        skip_controllers :applications, :authorized_applications, :authorizations
      end

      resources :users, only: [:create] do
        resources :posts, only: [:create, :show, :index]
      end
      put "users", to: "users#update"
      get "users", to: "users#show"
    end
  end
end
