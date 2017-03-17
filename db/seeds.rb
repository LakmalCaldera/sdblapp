User.create!({:email => "admin@gmail.com", :username => "admin123", :password => "admin123", :password_confirmation => "admin123",  })

puts "New Admin user created, username - admin123, password - admin123"

User.create!({:email => "user@gmail.com", :username => "user123", :password => "user123", :password_confirmation => "user123" })

puts "New Normal user created, username - user123, password - user123"

20.times do |index|
  Agent.create!(
      branch: "Brand 1213#{index*20 + 1}",
      account: index+1)
end

puts "Created 20 dummy agents"

500.times do |index|
  Transaction.create!(
      uid: "#{index*3}",
      agent: 1,
      customer: "customer name #{index*3}",
      amount: 1000,
      mobile: "no. 12343#{index*25}",
      timestamp: "#{1488806718 + index*100}",
      status: "status #{index}"
  )
end

puts "Created 500 dummy transactions which belong to Agent 1"

