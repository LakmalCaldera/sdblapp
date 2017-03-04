class TransactionsController < ApplicationController
  def index
    @transactions = Transaction.all
    @transaction_item = Transaction.new

    @transactions_count = Transaction.all.size
    @transactions_amount = Transaction.sum(:amount)
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
