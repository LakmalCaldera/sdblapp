FROM ruby:2.2.6-alpine

MAINTAINER Lakmal Caldera (lakmal.developer@gmail.com)

ENV BUILD_PACKAGES="build-base bash" \
    DEV_PACKAGES="sqlite-dev mysql-dev git" \
    RUBY_PACKAGES="nodejs"

# Update and install base packages and nokogiri gem that requires a
# native compilation
RUN apk update && \
    apk upgrade && \
    apk add --update\
    $BUILD_PACKAGES \
    $DEV_PACKAGES \
    $RUBY_PACKAGES

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
