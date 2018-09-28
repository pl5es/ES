Rails.application.routes.draw do
  scope 'api' do
    use_doorkeeper do
      skip_controllers :applications, :authorized_applications, :authorizations
    end
    resources :users#, only: [:create, :update]
  end
end
