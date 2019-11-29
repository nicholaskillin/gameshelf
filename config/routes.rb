Rails.application.routes.draw do
  
  get 'mechanics/create'
  get 'games/create'
  get 'games/update'
  get 'games/destroy'
  get 'games/details'
  get 'sessions/new'
  root 'static_pages#home'
  get '/signup', to: 'users#new'
  post '/signup', to: 'users#create'
  get '/login', to: 'sessions#new'
  post 'login', to: 'sessions#create'
  delete 'logout', to: 'sessions#destroy'
  post '/games', to: 'games#create'
  delete '/games', to: 'games#destroy'
  post '/categories', to: 'categories#create'
  post '/mechanics', to: 'mechanics#create'
  resources :users, param: :username do
    resources :games, only: [:index, :create, :edit, :update, :destroy]
    resources :friendships, only: [:index]
  end
  resources :password_resets, only: [:new, :create, :edit, :update]
  resources :account_activations, only: [:edit]
  resources :categories, only: [:create]
  resources :mechanics, only: [:create]

  namespace :api do 
    namespace :v1 do 
     resources :games, only: [:index]
     resources :users, only: [:index]
    end 
  end 

end
