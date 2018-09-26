Rails.application.routes.draw do
  namespace :api do
    resources :users#, only: [:create, :update]
  end
end
