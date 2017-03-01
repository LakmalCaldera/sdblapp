class AgentsController < ApplicationController
	def index
    	@agents = Agent.all
			@agents_count = Agent.all.size

			@agent_item = Agent.new
  	end

  	def new
    	@agent_item = Agent.new
  	end

  	def create
    	@agent_item = Agent.new(params.require(:agent).permit(:account, :branch))

    	respond_to do |format|
      		if @agent_item.save
        		format.html { redirect_to agents_path, notice: 'Your portfolio item is now live.' }
      		else
        		format.html { render :new }
      		end
    	end
  	end

  	def edit
    	@agent_item = Agent.find(params[:id])
  	end

  	def update
    	@agent_item = Agent.find(params[:id])

    	respond_to do |format|
      		if @agent_item.update(params.require(:agent).permit(:account, :branch))
        		format.html { redirect_to agents_path, notice: 'The record successfully updated.' }
      		else
        		format.html { render :edit }
      		end
    	end
  	end

  	def show
    	@agent_item = Agent.find(params[:id])
  	end

  	def destroy
    	# Perform the lookup
    	@agent_item = Agent.find(params[:id])

    	# Destroy/delete the record
    	@agent_item.destroy

    	# Redirect
    	respond_to do |format|
      		format.html { redirect_to agents_path, notice: 'Record was removed.' }
    	end
  	end
end
