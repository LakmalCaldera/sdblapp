User.create!({:email => "sdbladmin@gmail.com", :username => "sdbladmin", :password => "sdbladmin", :password_confirmation => "sdbladmin", :admin => true })

puts "New Admin user created, username - sdbladmin, password - sdbladmin"

User.create!({:email => "sdbluser@gmail.com", :username => "sdbluser", :password => "sdbluser", :password_confirmation => "sdbluser" })

puts "New Normal user created, username - sdbluser, password - sdbluser"


