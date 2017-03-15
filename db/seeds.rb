3.times do |index|
  Agent.create!(
      branch: "Brand 1213#{index*20 + 1}",
      account: index+1)
end


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



User.create!({:email => "admin@gmail.com", :username => "admin123", :password => "admin123", :password_confirmation => "admin123" })

puts "New user created, username - admin@gmail.com, password - admin123"