class CreateAgents < ActiveRecord::Migration[5.0]
  def change
    create_table :agents, :id => false do |t|
      t.text :account, :options => 'PRIMARY KEY'
      t.text :branch
    end

    add_index :agents, :account, unique: true, :length => { :account => 64 }
  end
end
