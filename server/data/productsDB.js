const mongoose = require('mongoose');

const conn = mongoose.createConnection('mongodb://127.0.0.1:27017/gcb-products',
  {
  useNewUrlParser: true,
  useUnifiedTopology: true
  }
)
  
conn.catch(err => console.log("Error Connection to MongoDB Products DB " + err))

const Product = conn.model('Product', require('./Product'))
module.exports = Product