class CreateTransactions < ActiveRecord::Migration[5.0]
  def change
    create_table :transactions, :id => false  do |t|
      t.text :uid, :options => 'PRIMARY KEY'
      t.text :customer
      t.integer :amount
      t.timestamp :timestamp
      t.text :status
      t.text :mobile
      t.text :agent
    end

    add_index :transactions, :uid, unique: true, :length => { :uid => 64 }
    end
  end
