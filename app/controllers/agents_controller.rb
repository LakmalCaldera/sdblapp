class AgentsController < ApplicationController
  respond_to :html, :json
  def index
    @agent_item = Agent.new
    @agents_count = Agent.all.size

    respond_to do |format|
      format.html
      format.json do
        render json: AgentsDatatable.new(view_context)
      end
    end
  end

  def new
    @agent_item = Agent.new
  end

  def create
    @agent_item = Agent.new(params.permit(:account, :branch))
    @agent_item.save
  end

  def edit
    @agent_item = Agent.find(params[:id])
  end

  def update
    @agent_item = Agent.find(params[:id])
    @agent_item.update(params.permit(:account, :branch))
  end

  def show
    @agent_item = Agent.find(params[:id])
  end

  def destroy
    # Perform the lookup
    @agent_item = Agent.find(params[:id])

    # Destroy/delete the record
    @agent_item.destroy

  end
end
