Rails.application.routes.draw do
  
  get 'games/create'
  get 'games/update'
  get 'games/destroy'
  get 'sessions/new'
  root 'static_pages#home'
  get '/signup', to: 'users#new'
  post '/signup', to: 'users#create'
  get '/login', to: 'sessions#new'
  post 'login', to: 'sessions#create'
  delete 'logout', to: 'sessions#destroy'
  post '/games', to: 'games#create'
  post '/categories', to: 'categories#create'
  resources  :users
  resources  :password_resets, only: [:new, :create, :edit, :update]
  resources :account_activations, only: [:edit]
  resources :games, only: [:create, :edit, :update, :destroy]
  resources :categories, only: [:create]

end
