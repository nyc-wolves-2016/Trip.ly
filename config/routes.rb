Rails.application.routes.draw do
  root to: "home#index"

  devise_scope :user do
    get "/register", to: "devise/registrations#new"
    post "/register", to: "devise/registrations#create"
    get "/login", to: "users/sessions#new"
    post "/login", to: "users/sessions#new"
    delete "/logout", to: "users/sessions#destroy"
  end

  devise_for :users, controllers: { omniauth_callbacks: "users/omniauth_callbacks", sessions: 'users/sessions' }

  get "/users/:user_id", to: "users#show"

  resources :trips, except: [:index] do
    resources :packing_lists, except: [:index, :new, :edit] do
      resources :items, only: [:create, :update, :destroy]
    end
    resources :resource_lists, except: [:index, :new, :edit] do
      resources :resources, only: [:create, :update, :destroy]
    end
    resources :itineraries, except: [:new, :edit, :update] do
      resources :events, only: [:create, :update, :destroy]
    end
  end

end
