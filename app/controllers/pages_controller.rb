class PagesController < ApplicationController
  def home

  end

  def records
  	@agents = Agent.all
  	@transactions = Transaction.all
  end
end
