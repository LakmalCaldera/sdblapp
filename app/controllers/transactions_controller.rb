class TransactionsController < ApplicationController
  respond_to :html, :json
  def index
    respond_to do |format|
      format.html
      format.json do
        render json: TransactionsDatatable.new(view_context)
      end
    end
  end
end
