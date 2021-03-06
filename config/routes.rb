Rails.application.routes.draw do
  get 'auth/:provider/callback', to: 'sessions#create'
  get 'auth/failure', to: redirect('/admin')
  get 'signout', to: 'sessions#destroy', as: 'signout'

  get 'maintenance', to: 'sessions#maintenance_mode'
  match "/application.manifest" => Rails::Offline, via: [:get, :post]

  resources :songs, except: ["show"]
  get '/songs/:id', to: redirect('/%{id}')

  root to: 'songs#app'
  get 'edit', to: 'songs#edit' # shortcut when wanting to edit a song from main app
  get '/:s/e', to: 'songs#edit'
  get '/:s', to: 'songs#app', s: /[0-9]+/
  get '/r', to: 'songs#app', s: Song.pluck(:id).sample
  get 'admin', to: 'songs#admin'

  get 'taketime', to: 'take_time#take_time'

  namespace :api do
    namespace :v1 do
      get 'app_data', to: 'songs#app_data'
    end
  end
end
