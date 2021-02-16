import React, {useState, useEffect, useRef} from "react";
import { Collapse } from 'antd';
import CheckboxFilter from './CheckboxFilter'
import {useSelector, useDispatch} from 'react-redux'
import {increment} from '../actions-example'
import { Checkbox} from 'antd';
import { toggleFilter,fetchProductsIfNeeded, urlChange} from '../actions';
import { Link, useHistory, useLocation, Redirect} from 'react-router-dom'
import 'antd/dist/antd.css'
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import {useDidMount} from "./utils/renderCheck";
import { fetchedProducts } from "../reducers/products";
import qs from 'query-string'

let render = 1;

const viewLimit = 4;
const resetPageNo = 1;

const FilterCollection = () =>{
  const history = useHistory()
  const query = new URLSearchParams(history.location.search)

  const dispatch = useDispatch()
  const didMount = useDidMount();
  const state = useSelector(state => state)

  const {filterUrl, outcome, fetchedProducts} = state
  
  const {isFetching, data, filters, meta} = fetchedProducts[query.toString()]
  || 
  { 
    isFetching: outcome.isFetching,
    data: outcome.data,
    meta: outcome.meta,
    filters: outcome.filters
  }
  console.log('state init', filters)

  // console.log('query: ',qs.parse(history.location.search))
  // const isFirstRender = useRef(true);

  // useEffect(() => {
  //   if (isFirstRender.current) {
  //     isFirstRender.current = false;
  //   } else {
  //      console.log('users changed')
  //      console.log(filterUrl)
  //   }
  // }, [filterUrl]);
   
    // const [Products, setProducts] = useState([]);
    // const [IgnoreData, setIgnoreData] = useState(0);
    // const [BoundData] = useState(4);
    // const [OnPageSize, setOnPageSize] = useState();
    // const [loading, setLoading] = useState(false);
    // const [productAmount, setProductAmount] = useState();
    
    
    //  using saga instead
    useEffect(() => {
      // const pageNo = parseInt(query.get('page')) || 1;
      
      // initialise the page with all products 
      // the skip and limit are acknowledged with every render (sent to mongodb)      
      // dispatch(fetchProductsIfNeeded({params: query.toString(), 
      //                                 config: {skip: 0, 
      //                                 limit: 4 * pageNo,
      //                                 page: pageNo,
      //                               }}))

    }, []);
    

// console.log('query params', query.toString())

const pushParamToUrl = () =>{
  query.sort();
  history.push({
    pathname: '/products/',
    search: query.toString()
  })
}


const [ locationKeys, setLocationKeys ] = useState([])
useEffect(() => {
    
    return history.listen((location, action) => {
      // console.log('location in filt: ',location)
      if (action === 'PUSH') {
        setLocationKeys([ location.key ])
      }

      // currently/intialNav: [] - when back is hit: ['xxxx'] - back again: ['yyyy', 'xxxx']
      // 'xxxx' key represents the intial point at which the back button is clicked. --back---'xxxx'-intial
      // - foward: if the 2nd elem is equal to the current location key => go forward

      // scenrio 
        // user clicks back btn, that appends a loc key in LocationKey arr. 
        // now, user wants to go foward after the prev back action. 
          // this will bypass the first condition, since theres only 1 elem. 

        // if intialising with a random key. the first back will append key in front. 

      if (action === 'POP') {
        if (locationKeys[1] === location.key) {
          setLocationKeys(([ _, ...keys ]) => keys)
          console.log('the location keys in forward state: ', location.key)
          console.log("foward", locationKeys)
          // redux must back to the most recent state
          dispatch(fetchProductsIfNeeded(query.toString()))
        }
        else{
          
          setLocationKeys((keys) => [ location.key, ...keys ])
        
          console.log('the location keys in back state: ', location.key)

          console.log("back", locationKeys)
          //redux must go back to the previous state. type : PREVIOUS_NAV_STATE
          dispatch(fetchProductsIfNeeded(query.toString()))

  
        }
    }
    })
  }, [locationKeys])

 
  const onLoadMore = () => {
    
    // query.set('limit', 4);
    // query.set('skip', 0);
    // history.push({
    //   pathname: '/products',
    //   search: query.toString()
    // })
    
    dispatch(fetchProductsIfNeeded({
      params: query.toString(),
      config: {skip: meta.skip,
              limit: viewLimit,
              page: outcome.meta.page,
              loadMore: true}}))
    // dispatch(urlChange(query.toString()))
  }

  useEffect(()=>{

    if(didMount){
      return 
    }

    query.set('page', meta.page)

    // query.sort();
    pushParamToUrl();
    // dispatch(urlChange(query.toString()))

  }, [meta.page])


//  this vs saga (INIT_PRODUCTS)?
// useEffect(()=>{

//   console.log(query.toString())
//   const filtersFromUrl = Array.from(query.entries()).map((filter) => { return {id: parseInt(filter[1]), field:filter[0]}});

//   console.log('from url: ',filtersFromUrl)

//   filtersFromUrl.map((filter) => {
//     return dispatch(toggleFilter(filter.id, filter.field))
//   });

// }, [])


const handleChange = (value, field) => {

  // dispatch(toggleFilter(value.id, field))
  if (!value.active){
    query.append(field, value.id);

  }
  else{
    const getFilterIDs = query.getAll(field);
    query.delete(field)
    
    getFilterIDs.map((id) => 
    {
      if(value.id != id){
        query.append(field, id);
      }
    })

  }

  // the checkbox activ. is lagging due to prev store state. 
  // console.log('activity for ', field, value.id, value.active)

  query.set('page', resetPageNo);

  pushParamToUrl();
  
  dispatch(fetchProductsIfNeeded({params: query.toString(),
                                config: {skip: 0, limit: viewLimit, page: resetPageNo,
                                  id:value.id, field:field
                              },
                              }));

  // dispatch(urlChange(query.toString()))
  
}

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const { Panel } = Collapse;


return (
       <>
        <Link to="/">Home</Link>

        {
          filters.map((type, i)=> {
            console.log('see from render ',type.field_name, type.filter_triggered)
            
            // if (type.field_name === "cat"){
            //   console.log('obj reduce:', type.data.reduce((sum, next) => {return sum && next.active}))
            // }
            return (
              <div key={i}>
                    <Collapse
                      defaultActiveKey={type.filter_triggered ? type.field_name : ''} 
                      className={type.input.some((sum) =>  sum.active ) ? 'highlight-border': ''}
                        >
          
                {/* touched previous state tells whether either one  */}
                        <Panel header={type.title} key={type.field_name}>
                        {type.input.map((value, i) => {
                          return (
                            <Checkbox
                              key={i}
                              onChange={() => {handleChange(value, type.field_name)}}
                              checked={value.active}>
                              {value.name}
                            </Checkbox>
                            )
                          })
                        }
                        </Panel>
                    </Collapse>
            
                  </div>
                    )
            })
        }

       <Spin indicator={antIcon} spinning={isFetching} delay={500} tip={"Fetching Products"}/>

          <div >
            <div>Amount of products {meta.count}</div>
            {meta.count == 0  && <div>No products to show</div>}
            {
            data.map(
                (p,i) => { return (
                  
                    <div className="tiles-item" key={i}>
                        <div className="tiles-item-inner center-content">
                        <img 
                            // src={p.image}
                            style={{width: "300px", height:'300px'}}
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
        {!data[meta.count - 1] && 
          <div className="center-content mt-32"><button onClick={onLoadMore}>Load More</button></div>
          }   

</> 

    )
}

export default FilterCollection
