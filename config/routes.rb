Rails.application.routes.draw do
  root "application#index"

  get "/login", to: "users#login"
  post "/login", to: "users#signin"
  get "/logout", to: "users#logout"

  resources :users, only: [:new, :create, :show]

  resources :trips, except: [:index, :new, :edit] do
    resources :packing_lists, except: [:index, :new, :edit] do
      resources :items, only: [:create, :update, :destroy]
    end
    resources :resource_lists, except: [:index, :new, :edit] do
      resources :resources, only: [:create, :update, :destroy]
    end
    resources :itineraries, except: [:index, :new, :edit, :update] do
      resources :events, only: [:create, :update, :destroy]
    end
  end
end
