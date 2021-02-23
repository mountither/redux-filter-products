import React, {useState, useEffect} from "react";
import { Collapse } from 'antd';
import CheckboxFilter from './CheckboxFilter'
import {useSelector, useDispatch} from 'react-redux'
import {increment} from '../actions-example'

import 'antd/dist/antd.dark.css'

import {CategoryFilter,
    BrandFilter,
    FinishFilter,
    HoldFilter,
    HairTypeFilter} from './filters'


    
    const filterInfo = [
    {
      header:'Category', 
      list: CategoryFilter,
      filterName: 'category'
    },
    {
      header:'Brand', 
      list: BrandFilter,
      filterName: 'brand' 
    },
    {
      header:'Finish', 
      list: FinishFilter,
      filterName: 'finish' 
    },
    {
      header:'Hold', 
      list: HoldFilter,
      filterName: 'hold' 
    },
    {
      header:'Hair Type', 
      list: HairTypeFilter,
      filterName: 'hair' 
    }
]
const FilterCollection = () =>{
  
  const dispatch = useDispatch();
  const count = useSelector(state => state.count)
    
    const [Filtered, setFilters] = useState({
        category: [],
        brand: [],
        finish: [],
        hold: [],
        hair: [],
    });

    
    
    const [Products, setProducts] = useState([]);
    const [IgnoreData, setIgnoreData] = useState(0);
    const [BoundData] = useState(4);
    const [OnPageSize, setOnPageSize] = useState();
    const [loading, setLoading] = useState(false);
    const [productAmount, setProductAmount] = useState();


    const handleFilters = (filters, category) => {

        console.log(filters, category);
        const newFilters = {...Filtered}

        newFilters[category] = filters
        revealResults(newFilters)
        setFilters(newFilters);

    }

     
    useEffect(() => {

      // initialise the page with all products 
      // the skip and limit are acknowledged with every render (sent to mongodb)
      const data = {
        skip: IgnoreData,
        limit: BoundData
      }
      getProducts(data)

    }, []);
    

    const getProducts = async (config) => {
    
      // console.log(config.filters)
      try{

        setLoading(true)
        const res = await fetch(`http://localhost:8000/api/products`, {
        method: 'POST',
        body: JSON.stringify(config),
        headers: { 
            'Content-Type': 'application/json'
        } 
        });
        if (!res.ok) {      
      		throw new Error('Failed to fetch product')
        } 
        
        const prodData = await res.json()
        // if config loadmore is set to true (loadmore btn is clicked), append the incoming products here
        
        setProductAmount(prodData.count)

        if(config.loadMore){

          setProducts([...Products, ...prodData.prods])
          
        }
        else{
          setProducts(prodData.prods);
        }

        setOnPageSize(prodData.onPgeSize)

        setLoading(false);
      }
      catch(err)
      {
        console.log('connection to product database failed ' + err)
      }
    }
    console.log(Filtered)
    const revealResults = (filters) => {

      const variables ={ skip: 0,
                        limit: BoundData,
                        filters: filters
                      }

      getProducts(variables)
      // should not ignore products (skip in mongodb) when purely filtered
      setIgnoreData(0)

  }

  const onLoadMore = () => {
    const skip = IgnoreData + BoundData;

    const variables = {
        skip: skip,
        limit: BoundData,
        loadMore: true,
        filters: Filtered
    }

    getProducts(variables)
    setIgnoreData(skip)


    dispatch(increment())
}


    const { Panel } = Collapse;

    return (
<>
        <ul className='list-reset'>  
        {
            filterInfo.map((f, i)=> {
                
                return (
                    <li key={i}>
                    <Collapse defaultActiveKey={['0']} className={Filtered[f.filterName].length > 0 && "highlight-border"}>
                        <Panel  header={f.header} key="1">
                        <CheckboxFilter list={f.list} handleFilters={filters => handleFilters(filters, f.filterName)}/>
                        </Panel>
                    </Collapse>
                    </li>
                    )
            })
        }
        </ul>

          <div >
            {Products.length == 0  && <div>No products to show</div>}
            {
            Products.map(
                (p,i) => { return (
                  
                    <div className="tiles-item" key={i}>
                        <div className="tiles-item-inner center-content">
                        <img 
                            src={p.image} style={{width: "300px", height:'300px'}}
                            />
                        <div className="products-item-content">
                        {p.name} <br/>
                        { p.fragrance ? <p className="text-xxs mt-16">
                        Smells Like: {p.fragrance}</p> : ''}
                        <p className="text-xs mt-4">{p.description}</p>
                        </div>
                        </div>
                    </div>
                        )
                    }
                )
            }
        </div>
        { OnPageSize >= BoundData && 
          <div className="center-content mt-32"><button onClick={onLoadMore}>Load More</button></div>
          }   

</>

    )
}

export default FilterCollection;