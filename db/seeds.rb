User.create!({:email => "sdbladmin@gmail.com", :username => "sdbladmin", :password => "sdbladmin", :password_confirmation => "sdbladmin", :admin => true })

puts "New Admin user created, username - sdbladmin, password - sdbladmin"

User.create!({:email => "sdbluser@gmail.com", :username => "sdbluser", :password => "sdbluser", :password_confirmation => "sdbluser" })

puts "New Normal user created, username - sdbluser, password - sdbluser"

20.times do |index|
  Agent.create!(
      branch: "Brand 1213#{index*12320 + 1}",
      account: "#{index + 1}",
      region: "Region #{index + 1}")
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

