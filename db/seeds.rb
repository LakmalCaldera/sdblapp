10.times do |blog|
  Agent.create!(
    branch: "Brand xxx",
    account: "Account xxx"
  )
end

puts "10 agents created"

5.times do |blog|
  Transaction.create!(
  	agent: "agent name xxx",
    customer: "customer name xxx",
    amount: 000,
    status: "status x"
  )
end

puts "5 Transations created"