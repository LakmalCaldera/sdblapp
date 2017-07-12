class TransactionsController < ApplicationController
  respond_to :html, :json
  def index
    @branch_filter = params[:branch] || nil
    respond_to do |format|
      format.html
      format.json do
        render json: TransactionsDatatable.new(view_context, @branch_filter)
      end
    end
  end
end
