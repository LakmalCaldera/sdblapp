class CreateAgents < ActiveRecord::Migration[5.0]
  def change
    create_table :agents, :id => false do |t|
      t.string :account, :options => 'PRIMARY KEY', :limit => 64, :null => false
      t.text :branch, :null => false
    end

    add_index :agents, :account, unique: true, :length => { :account => 64 }
  end
end
