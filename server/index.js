const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const Product = require('./data/productsDB')
const qs = require('query-string')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS'){
      return res.sendStatus(200);
    }
      next();
});


app.get('/api/products/', async (req, res) =>{

  try {
    const getFiltered = {};
    const query = qs.parse(req._parsedUrl.search, {parseNumbers: true, arrayFormat:'comma'})
    let limit = parseInt(query.limit) || 4;
    let skip = parseInt(query.skip) || 0;
    //key : "brand" or "finish" or ...
    for (const key in query) {
      
      if (key !== 'limit'&& key !== 'skip') {
          // req.body.filters[key] : [1, 2, 3]
          if(key === "hair"){
            getFiltered[key] = {
              // hair field includes an array of many elements (need to find either elem)
              $in: query[key]
            }
  
          }else {
  
            getFiltered[key] = query[key];
          }
  
      }
      
    }

    console.log(getFiltered);
  
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