class CreateTransactions < ActiveRecord::Migration[5.0]
  def change
    create_table :transactions do |t|
      t.text :agent
      t.text :customer
      t.integer :amount
      t.text :status

      t.timestamps
    end
  end
end
