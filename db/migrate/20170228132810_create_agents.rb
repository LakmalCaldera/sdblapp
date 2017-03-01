class CreateAgents < ActiveRecord::Migration[5.0]
  def change
    create_table :agents do |t|
      t.text :account
      t.text :branch

      t.timestamps
    end
  end
end
