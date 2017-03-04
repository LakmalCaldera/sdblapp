10.times do |blog|
  Agent.create!(
    AGENT_BRANCH: "Brand xxx",
    AGENT_ACCOUNT: "Account xxx")
  end


15.times do |index|
  Transaction.create!(
      TRANS_AGENT: "agent name #{index}",
      TRANS_CUSTOMER: "customer name #{index}",
      TRANS_AMOUNT: 1000,
      TRANS_STATUS: "status #{index}"
  )
end

puts "5 Transations created"


User.create!(username: "admin", password: "admin", email: "admin@support.com")

pepper = nil
cost = 10
encrypted_password = ::BCrypt::Password.create("#{password}#{nil}", :cost => 10).to_s

User.create!({:email => "admin@gmail.com", :username => "admin123", :password => "admin123", :password_confirmation => "admin123" })

puts "New user created, username - admin, password - admin"