#10.times do |blog|
#  Agent.create!(
#    branch: "Brand xxx",
#    account: "Account xxx"
#

15.times do |index|
  Transaction.create!(
      agent: "agent name #{index}",
      customer: "customer name #{index}",
      amount: 1000,
      status: "status #{index}"
  )
end

puts "5 Transations created"