# frozen_string_literal: true

Rails.application.routes.draw do
  constraints format: :json do
    scope "api" do
      use_doorkeeper do
        skip_controllers :applications, :authorized_applications, :authorizations
      end

      resource :users, only: [:create, :show, :update] do
        resources :posts, only: [:create, :show, :index]
      end
    end
  end
end
