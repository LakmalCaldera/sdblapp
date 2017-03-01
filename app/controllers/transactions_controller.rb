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

  def create
    @transaction_item = Transaction.new(params.require(:transaction).permit(:agent, :customer, :amount, :status))

    respond_to do |format|
      if @transaction_item.save
        format.html { redirect_to transactions_path, notice: 'Your item is now live.' }
      else
        format.html { render :new }
      end
    end
  end

  def edit
    @transaction_item = Transaction.find(params[:id])
  end

  def update
    @transaction_item = Transaction.find(params[:id])

    respond_to do |format|
      if @transaction_item.update(params.require(:transaction).permit(:agent, :customer, :amount, :status))
        format.html { redirect_to transactions_path, notice: 'Your item is now live.' }
      else
        format.html { render :edit }
      end
    end
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
