const { connect, connection } = require('mongoose')
// 'mongodb://localhost:27017/sisdb'
const connectionString =
  process.env.MONGODB_URI ||  'mongodb+srv://admin:admin1234@cluster0.yz84mhz.mongodb.net/?retryWrites=true&w=majority'


  

connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

module.exports = connection
