import React, {useState, useEffect, useLayoutEffect} from "react";
import { Collapse } from 'antd';
import CheckboxFilter from './CheckboxFilter'
import {useSelector, useDispatch} from 'react-redux'
import {increment} from '../actions-example'
import { Checkbox} from 'antd';
import { toggleFilter,fetchProductsIfNeeded, urlManipulation, browserChange, fetchProducts} from '../actions';
import { Link, useHistory, useLocation, Redirect} from 'react-router-dom'
import 'antd/dist/antd.dark.css'
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import qs from 'query-string'
import {pageInit, limitInit} from '../initialisation'

let render = 1;

const { Panel } = Collapse;

const FilterCollection = () =>{
  const history = useHistory()
  const location = useLocation();
  // const query = new URLSearchParams(history.location.search)


  // const queryURL = qs.parse(history.location.search, {parseNumbers: true, arrayFormat:'comma'})
  const queryToServer = qs.exclude(window.location.search, ['page']);
  const parsedQuery = qs.parse(window.location.search,{parseNumbers: true, arrayFormat: 'comma'})
  const dispatch = useDispatch()
  const state = useSelector(state => state)
  
  const {outcome} = state
  const {isFetching, filters, data, meta} = outcome 

  // const url = qs.stringify(meta.params,
  //   {arrayFormat: 'comma', skipNull: true, skipEmptyString: true});

  // const url = qs.exclude('?'+url1, ['page']);

  // const {isFetching, data, filters, meta} = fetchedProducts[window.location.search]
  // || 
  // { 
  //   isFetching: outcome.isFetching,
  //   data: outcome.data,
  //   meta: outcome.meta,
  //   filters: outcome.filters
  // }
  
  
  // const [Filters, setFilters] = useState({
  //   category: [],
  //   brand: [],
  //   finish: [],
  //   hold: [],
  //   hair: [],
  // });
 
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
      // Object.keys(parsedQuery).map( field =>
      //   parsedQuery[field]= Array.isArray(parsedQuery[field]) ? parsedQuery[field] : [parsedQuery[field]]
      // )

      // console.log('cleaned', parsedQuery);
      // setFilters(Object.assign({}, Filters, parsedQuery ));

      // console.log('url on inti', window.location.search);

      // dispatch(fetchProductsIfNeeded({query: '?'+url,
      //   config: {skip: 0, limit: viewLimit, page: resetPageNo,
      // }
      // }));
    //   dispatch(fetchProductsIfNeeded({query: url ? '?'+url : '',
    //   config: {skip: 0, limit: viewLimit, page: resetPageNo,
    // }
    // }));
    dispatch({type:"INIT_PRODUCTS"});

    // window.history.replaceState({state: outcome}, '', ``)

    window.onpopstate = (e) => {
      console.log('pop');
          if(e.state !== null){
            dispatch(browserChange(e.state.state))
          }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    

  console.log('PARSE fasD q', parsedQuery)

  // useEffect(()=> {
  
  //   if(!isFetching){
  //     history.push({
  //       pathname: '/products/',
  //       search: url,
  //       state: outcome
  //     });
  //   }
    
  // }, [meta.params])

  console.log('HISTORY!! ',window.history);


// const [ locationKeys, setLocationKeys ] = useState([])



// useEffect(() => {
    
//     return history.listen((location, action) => {

//       // console.log('location in filt: ',location)
//       if (action === 'PUSH') {
//         setLocationKeys([ location.key ])

//       }

//       // currently/intialNav: [] - when back is hit: ['xxxx'] - back again: ['yyyy', 'xxxx']
//       // 'xxxx' key represents the intial point at which the back button is clicked. --back---'xxxx'-intial
//       // - foward: if the 2nd elem is equal to the current location key => go forward

//       // scenrio 
//         // user clicks back btn, that appends a loc key in LocationKey arr. 
//         // now, user wants to go foward after the prev back action. 
//           // this will bypass the first condition, since theres only 1 elem. 

//         // if intialising with a random key. the first back will append key in front. 

//       if (action === 'POP') {
//         if (locationKeys[1] === location.key) {
//           setLocationKeys(([ _, ...keys ]) => keys)
//           console.log('the location keys in forward state: ', location.key)
//           console.log("foward", locationKeys)
//           // redux must back to the most recent state
//           console.log('hist state !!!',history.state);

//           // CALL WINDOW_NAV ACTION. old state will be used. Change will happen in this component. 
//           // Id required to identify what location (browser) user is in.

//           // dispatch(fetchProductsIfNeeded(window.location.search))
//           // dispatch(browserChange(history.location.state))
//           dispatch(browserChange(window.history.state))

//         }
//         else{
          
//           setLocationKeys((keys) => [ location.key, ...keys ])
        
//           console.log('the location keys in back state: ', location.key)

//           //redux must go back to the previous state. type : PREVIOUS_NAV_STATE
//           console.log("back", locationKeys)

//           console.log('hist state !!!',history.state);

          // dispatch(browserChange(history.location.state))
//           dispatch(browserChange(window.history.state))

          //dispatch(fetchProductsIfNeeded(window.location.search))
  
//         }
//     }
//     })
//   }, [locationKeys])

 
  const onLoadMore = () => {
    
    // query.set('limit', 4);
    // query.set('skip', 0);
    // history.push({
    //   pathname: '/products',
    //   search: query.toString()
    // })
    
    dispatch(fetchProductsIfNeeded({
      params: queryToServer,
      config: {
              skip: meta.skip + meta.limit,
              limit: limitInit,
              page: meta.page + 1,
              loadMore: true
            }
      }));
  // dispatch(urlManipulation(true))

  }

  // useEffect(()=>{

  //   if(didMount){
  //     return 
  //   }

  //   // query.set('page', meta.page)
  //   qs.stringify({'page': meta.page})
  //   // query.sort();
  //   // pushParamToUrl();
  //   // dispatch(urlChange(query.toString()))


  // }, [meta.page])


//  this vs saga (INIT_PRODUCTS)?
// useEffect(()=>{

//   console.log(query.toString())
//   const filtersFromUrl = Array.from(query.entries()).map((filter) => { return {id: parseInt(filter[1]), field:filter[0]}});

//   console.log('from url: ',filtersFromUrl)

//   filtersFromUrl.map((filter) => {
//     return dispatch(toggleFilter(filter.id, filter.field))
//   });

// }, [])



// const pushParamToUrl = (query) =>{
  
  
// }
const handleChange = (value, field) => {
  
  // const currentIndex = Filtered[field].indexOf(value.id);
  // Filters[field].push(value.id)
  // setFilters({...Filters})
  // push to history with updated params. 
  //    In this scenrio, the value id and field will be added or removed in params obj.
  //    The params obj is updated and the query is stringfied and url is upd.
  // const query = '?'+qs.stringify(outcome.meta.params, {arrayFormat: 'comma', skipNull: true, skipEmptyString: true})

  // dispatch(urlChange(url))


  // pushParamToUrl(qs.stringify(Filtered, {arrayFormat: 'comma'}));

 
  


  dispatch(toggleFilter(value.id, field,
  value.active ? true : false,));
  
  dispatch(fetchProductsIfNeeded({
  config: {skip: 0, limit: limitInit, page: pageInit,
  }}));

 
  // the checkbox activ. is lagging due to prev store state. 
  // console.log('activity for ', field, value.id, value.active)

  // query.set('page', resetPageNo);

  // qs.stringify({'page': resetPageNo})

  // dispatch(urlChange(filterUrl))
  // console.log('uel filt in change ',filterUrl);

  

  // dispatch(urlChange(query.toString()))


 
}


const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;


const [activeParams, setActiveParams] = useState([]);
console.log('active params', activeParams);
useEffect(() => {

  setActiveParams(
    Object.keys(meta.params).filter(field =>
      meta.params[field].length > 0)
  )
}, [meta.params])


return (
       <>
        <Link to="/">Home</Link>
        {/* {console.log('PARAMS ACTIVe',`${Math.floor((Math.random() * 1000))}-min`)} */}
      {/* {meta.status === 'FETCHED' && */}
        <Collapse
          // key={activeParams}
          
          // defaultActiveKey={activeParams}

          // className={activeParams.includes(type.field_name) ? 'highlight-border': ''}
        >
        {
          filters.map((type, i)=> {
            
            // if (type.field_name === "cat"){
              //   console.log('obj reduce:', type.data.reduce((sum, next) => {return sum && next.active}))
              // }
              //type.input.some((sum)=>  sum.active )
              // console.log(meta.params[type.field_name].length>0? [type.field_name] : '')
              return (
                      <Panel 
                        header={type.title}
                        className={activeParams.includes(type.field_name) ? 'highlight-border': ''}
                        // isActive={activeParams.includes(type.field_name) ? true : false}
                        key={type.field_name}
                        >

                        {type.input.map((value, i) => {
                        return (
                          <Checkbox
                            key={i}
                            onChange={() => handleChange(value, type.field_name)}
                            checked={value.active}>
                            {value.name}
                          </Checkbox>
                          )
                        })
                        }
                      </Panel>
            )
          })
        }
        </Collapse>
  {/* } */}
      

        <Spin indicator={antIcon} spinning={isFetching} delay={500} tip={"Fetching Products"}/>
            {!isFetching && meta.count > 0 && <div>Amount of products {meta.count}</div>}
            {meta.count === 0  && <div>No products to show</div>}
            {
            data.map(
                (p,i) => { return (
                  
                    <div className="tiles-item" key={i}>
                        <div className="tiles-item-inner center-content">
                        <img 
                            // src={p.image}
                            alt={p.name}
                            style={{width: "300px", height:'300px',}}
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
        {!data[meta.count - 1] && !isFetching && meta.count > 0 &&
          <div className="center-content mt-32"><button onClick={onLoadMore}>Load More</button></div>
        }   
      
      
</> 

    )
}

export default FilterCollection
