FROM ruby:2.2.6
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs

RUN mkdir /myapp
WORKDIR /myapp

ADD Gemfile /myapp/Gemfile
ADD . /myapp

RUN gem install bundle

# run app
ENTRYPOINT ["sh", "docker-entrypoint.sh"]
