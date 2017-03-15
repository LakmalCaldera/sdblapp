class CreateTransactions < ActiveRecord::Migration[5.0]
  def change
    create_table :transactions, :id => false  do |t|
      t.string :uid, :options => 'PRIMARY KEY', :limit => 64, :null => false
      t.text :customer, :null => false
      t.integer :amount, :null => false
      t.text :timestamp, :null => false
      t.text :status, :null => false
      t.text :mobile
      t.string :agent, :limit => 64, :null => false
    end

    add_index :transactions, :uid, unique: true, :length => { :uid => 64 }
    add_foreign_key :transactions, :agents, column: :agent, primary_key: :account
  end
end
