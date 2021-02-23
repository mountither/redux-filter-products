const mongoose = require('mongoose');

const conn = mongoose.createConnection('mongodb://192.168.0.14:27017/gcb-products',
  {
  useNewUrlParser: true,
  useUnifiedTopology: true
  }
)
  
conn.catch(err => console.log("Error Connection to MongoDB Products DB " + err))

const Product = conn.model('Product', require('./Product'))
module.exports = Product