class AddRegionToAgent < ActiveRecord::Migration[5.0]
  def change
    add_column :agents, :region, :text, null: false
  end
end
