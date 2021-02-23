const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const Product = require('./data/productsDB')


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


app.post('/api/products/', async (req, res) =>{

    try {
    const getFiltered = {};
  
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);
    //key : "brand" or "finish" or ...
    for (const key in req.body.filters) {
      
      if (req.body.filters[key].length > 0) {
          // req.body.filters[key] : [1, 2, 3]
  
          if(key === "hair"){
            getFiltered[key] = {
              // hair field includes an array of many elements (need to find either elem)
              $in: req.body.filters[key]
            }
  
          }else {
  
            getFiltered[key] = req.body.filters[key];
          }
  
      }
      
    }
  
    const prods= await Product.find(getFiltered).skip(skip).limit(limit);
    const count = await Product.countDocuments(getFiltered);
    // console.log(prods, count)
    return res.status(200).json({ok: true, prods, onPgeSize: prods.length, count})
    
    }
    catch(err){
      throw new Error('Error fetching products ' + err)
    }
  })
  
  
  app.listen('8000', '0.0.0.0');