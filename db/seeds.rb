500.times do |index|
  Agent.create!(
    branch: "Brand 123#{index*20}",
    account: "Account 0000#{index*45}")
  end


500.times do |index|
  Transaction.create!(
      uid: "#{index*3}",
      agent: "agent name #{index*12}",
      customer: "customer name #{index*3}",
      amount: 1000,
      mobile: "no. 12343#{index*25}",
      timestamp: "#{1488806718 + index*100}",
      status: "status #{index}"
  )
  end

puts "5 Transations created"

User.create!({:email => "admin@gmail.com", :username => "admin123", :password => "admin123", :password_confirmation => "admin123" })

puts "New user created, username - admin@gmail.com, password - admin123"