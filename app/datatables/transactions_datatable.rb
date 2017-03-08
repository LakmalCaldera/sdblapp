class TransactionsDatatable < AjaxDatatablesRails::Base

  def view_columns
    # Declare strings in this format: ModelName.column_name
    # or in aliased_join_table.column_name format
    @view_columns ||={
        agent: {source: "Transaction.agent", cond: filter_custom_column_condition},
        customer: {source: "Transaction.customer", cond: filter_custom_column_condition},
        timestamp: {source: "Transaction.timestamp", cond: filter_date_range_condition},
        status: {source: "Transaction.status", cond: filter_custom_column_condition},
        mobile: {source: "Transaction.mobile", cond: filter_custom_column_condition},
        amount: {source: "Transaction.amount", cond: filter_custom_column_condition}
    }
  end

  def data
    records.map do |record|
      {
          # example:
          agent: record.agent,
          customer: record.customer,
          timestamp: record.timestamp,
          status: record.status,
          mobile: record.mobile,
          amount: record.amount
      }
    end
  end

  def as_json(options = {})
    {
        :draw => params[:draw].to_i,
        :TotalAmount => get_raw_records.sum(:amount),
        :filteredTotalAmount => filter_records(get_raw_records).sum(:amount),
        :recordsTotal => get_raw_records.count(:all),
        :recordsFiltered => filter_records(get_raw_records).count(:all),
        :data => data
    }
  end

  def get_raw_records
    # insert query here
    Transaction.all
  end

  def filter_custom_column_condition
    ->(column) { ::Arel::Nodes::SqlLiteral.new(column.field.to_s).matches("%#{ column.search.value }%") }
  end

  def filter_date_column_condition
    ->(column) { Transaction.arel_table[:timestamp].gteq(column.search.value.to_i).and(Transaction.arel_table[:timestamp].lt(column.search.value.to_i + 86400)) }
  end

  def filter_date_range_condition
    ->(column) {
      unix_timestamp_min = column.search.value.split("-")[0].to_i
      unix_timestamp_max = column.search.value.split("-")[1].to_i + 86400
      Transaction.arel_table[:timestamp].gteq(unix_timestamp_min).and(Transaction.arel_table[:timestamp].lt(unix_timestamp_max))
    }
  end
end



