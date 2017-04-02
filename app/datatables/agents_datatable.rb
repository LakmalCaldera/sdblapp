class AgentsDatatable < AjaxDatatablesRails::Base

  def view_columns
    # Declare strings in this format: ModelName.column_name
    # or in aliased_join_table.column_name format
    @view_columns ||={
        account: {source: "Agent.account", cond: filter_custom_column_condition},
        branch: {source: "Agent.branch", cond: filter_custom_column_condition},
        region: {source: "Agent.region", cond: filter_custom_column_condition}
    }
  end

  def data
    records.map do |record|
      {
          # example:
          account: record.account,
          branch: record.branch,
          region: record.region
      }
    end
  end

  def get_raw_records
    # insert query here
    Agent.all
  end

  def filter_custom_column_condition
    ->(column) { ::Arel::Nodes::SqlLiteral.new(column.field.to_s).matches("%#{ column.search.value }%") }
  end
end