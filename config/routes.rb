Rails.application.routes.draw do

  get 'pages/home'

  resources :agents
  resources :transactions
  
  root to: 'pages#home'
end
