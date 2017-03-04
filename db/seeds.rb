10.times do |index|
  Agent.create!(
    branch: "Brand xxx",
    account: "Account #{index}")
  end


15.times do |index|
  Transaction.create!(
      uid: "#{index}",
      agent: "agent name #{index}",
      customer: "customer name #{index}",
      amount: 1000,
      status: "status #{index}"
  )
end

puts "5 Transations created"

User.create!({:email => "admin@gmail.com", :username => "admin123", :password => "admin123", :password_confirmation => "admin123" })

puts "New user created, username - admin, password - admin"