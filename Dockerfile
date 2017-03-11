FROM ruby:2.2.6

MAINTAINER Lakmal Caldera (lakmal.developer@gmail.com)

RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs

RUN gem install bundle

# Set up
RUN mkdir /myapp
WORKDIR /myapp
ADD Gemfile /myapp/Gemfile
ADD Gemfile.lock /myapp/Gemfile.lock
RUN bundle install
ADD . /myapp

# run app
ENTRYPOINT ["sh", "docker-entrypoint.sh"]
