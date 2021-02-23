<<<<<<< HEAD
const mongoose = require('mongoose');

const conn = mongoose.createConnection('mongodb://127.0.0.1:27017/gcb-products',
  {
  useNewUrlParser: true,
  useUnifiedTopology: true
  }
)
  
conn.catch(err => console.log("Error Connection to MongoDB Products DB " + err))

const Product = conn.model('Product', require('./Product'))
=======
const mongoose = require('mongoose');

const conn = mongoose.createConnection('mongodb://127.0.0.1:27017/gcb-products',
  {
  useNewUrlParser: true,
  useUnifiedTopology: true
  }
)
  
conn.catch(err => console.log("Error Connection to MongoDB Products DB " + err))

const Product = conn.model('Product', require('./Product'))
>>>>>>> 5748739d08140cb22bd7d6a31a48514da5073396
module.exports = Product