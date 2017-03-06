class TransactionsController < ApplicationController
  respond_to :html, :json
  def index
    @transaction_item = Transaction.new

    @transactions_count = Transaction.all.size
    @transactions_amount = Transaction.sum(:amount)

    respond_to do |format|
      format.html
      format.json do
        render json: TransactionsDatatable.new(view_context)
      end
    end
  end

  def new
    @transaction_item = Transaction.new
  end

  def show
    @transaction_item = Transaction.find(params[:id])
  end

  def destroy
    # Perform the lookup
    @transaction_item = Transaction.find(params[:id])

    # Destroy/delete the record
    @transaction_item.destroy

    # Redirect
    respond_to do |format|
      format.html { redirect_to transactions_path, notice: 'Record was removed.' }
    end
  end
end
