class AgentsController < ApplicationController
  respond_to :html, :json
  def index
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
    @agent_item = Agent.new(params.permit(:account, :branch, :region))
    @agent_item.save
  end

  def edit
    @agent_item = Agent.find(params[:id])
  end

  def update
    @agent_item = Agent.find(params[:id])
    @agent_item.update(params.permit(:account, :branch, :region))
  end

  def show
    @agent_item = Agent.find(params[:id])
  end

  def destroy
    # Perform the lookup
    @agent_item = Agent.find(params[:item])

    # Destroy/delete the record
    @agent_item.destroy

  end
end
