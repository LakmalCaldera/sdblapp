Rails.application.routes.draw do
  get 'pages/transRecords'

  get 'pages/agentRecords'

  get 'pages/home'
  get 'pages/records'

  root to: 'pages#home'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
