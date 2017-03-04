class CreateTransactions < ActiveRecord::Migration[5.0]
  def change
    create_table :transactions do |t|
      t.integer :TRANS_ID
      t.text :TRANS_UID
      t.text :TRANS_CUSTOMER
      t.integer :TRANS_AMOUNT
      t.text :TRANS_STATUS
      t.text :TRANS_AGENT
      t.text :TRANS_MOBILE_NO

      t.timestamps
    end
  end
end
