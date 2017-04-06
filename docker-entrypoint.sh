#!/bin/bash

echo Running script to start application and setup db;

# if the required port is busy, remove it first
  rm -f tmp/pids/server.pid

# Must run this command to install gems at least once
  bundle install

# Precompile all assets
  bundle exec rake assets:precompile

# create db, only need when building image first time[This command will fail running the next time]
  rake db:create --trace

# run migrate after creating the db to create the schema on rails
  rake db:migrate --trace

# clean all data from all tables and runs the seed file. Only run this, if you want data will be erased from db.
# rails db:setup

# seed the database with data, if seeding first time, creats a default user, admin@gmail.com, pass - admin123[This command will fail running the next time, as not duplicate entries are allowed]
 rake db:seed --trace

# start rails server
  bundle exec rails s -p 3000 -b '0.0.0.0'