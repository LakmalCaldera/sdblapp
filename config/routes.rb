Rails.application.routes.draw do

  devise_for :users
  get 'pages/home'

  resources :agents
  resources :transactions
  resources :uploads

  root to: 'agents#index'


end
