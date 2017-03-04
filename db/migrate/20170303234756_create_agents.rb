class CreateAgents < ActiveRecord::Migration[5.0]
  def change
    create_table :agents do |t|
      t.integer :AGENT_ID
      t.text :AGENT_ACCOUNT
      t.text :AGENT_BRANCH

      t.timestamps
    end
  end
end
