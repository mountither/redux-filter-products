const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const Product = require('./data/productsDB')
const url = require('url');

app.use(bodyParser.json());


app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS'){
      return res.sendStatus(200);
    }
      next();
});


app.get('/api/products', async (req, res) =>{

    console.log(req.query)

    try {
    const getFiltered = {};
  
    let limit = parseInt(req.query.limit) || 4;
    let skip = parseInt(req.query.skip) || 0;
    //key : "brand" or "finish" or ...
    for (const key in req.query) {
      if (req.query[key].length > 0 && (key != 'limit' && key != 'skip' && key != 'page')) {
          // req.body.filters[key] : [1, 2, 3]
          console.log(key)
          if(key === "hair"){
            getFiltered[key] = {
              // hair field includes an array of many elements (need to find either elem)
              $in: req.query[key]
            }
          }else {

            getFiltered[key] = req.query[key];
          }
  
      }
      
    }
  
    const prods = await Product.find(getFiltered).skip(skip).limit(limit);
    const count = await Product.countDocuments(getFiltered);
    // console.log(prods, count)
    return res.status(200).json({ok: true, prods, count})
    
    }
    catch(err){
      throw new Error('Error fetching products ' + err)
    }
  })
  
  
  app.listen('8000', '0.0.0.0');