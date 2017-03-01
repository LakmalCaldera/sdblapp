FROM ruby:2.4.0
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs

RUN mkdir /myapp
WORKDIR /myapp

ADD Gemfile /myapp/Gemfile
ADD Gemfile.lock /myapp/Gemfile.lock

RUN gem install bootstrap-sass -v 3.2.0
RUN gem install jquery-rails -v 3.0.4
RUN gem install jquery-datatables-rails -v 1.12.2
RUN gem install will_paginate -v 3.1.0
RUN bundle install
RUN rails generate jquery:datatables:install
ADD . /myapp