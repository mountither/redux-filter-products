import qs from 'query-string'
import history from '../utils/history'


export const toggleFilter = (id, name, deselect) => ({
  type: 'TOGGLE_FILTER',
  id: id, 
  field:name,
  deselect: deselect
});

const urlChange = (url, loadMore) => ({
  type: loadMore ? "ADD_PAGE_NO" : "URL_CHANGE",
  url: url,
})

// const pageChange = (url) => ({
//   type:"ADD_PAGE_NO",
//   url: url,
// })

export const clearFilters = () => ({
  type: 'CLEAR_FILTERS'
})

export const browserChange = (result) => ({
  type: 'WINDOW_NAV',
  oldState: result
})

export const initFilters = (params) => ({
  type: 'INIT_FILTER_UI',
  urlFilters: params,
})

//make url persist in store. action => "URL_CHANGE"

export const requestProducts = () =>({
  type: 'REQUEST_PRODUCTS'
});

export const receiveProducts = (json, filters, results) =>({
  type: 'RECEIVE_PRODUCTS',
  data: json.prods,
  meta: {
    count: json.count,
    limit: filters.config.limit,
    skip: filters.config.skip,
    loadMore: filters.config.loadMore,
    page: filters.config.page,
    params: results.meta.params,
  }
});

export const fetchProducts = (filters, state) => (dispatch) => {
    // query manipualtion
    const queryFilters = qs.stringify(state.meta.params,
        {arrayFormat: 'comma', skipNull: true, skipEmptyString: true});

    const url = `${process.env.REACT_APP_SERVER}:8000/api/products/?${queryFilters}&skip=${filters.config.skip}&limit=${filters.config.limit}`
    
    // `${queryFilters ? '?'+queryFilters: ''}`
    const queryToServer = qs.exclude(url, ['page']);

    //dispatch a request for products
    dispatch(requestProducts(filters))
    // fetch the json product from server - port 8000
    return fetch(queryToServer)
    .then(response => response.json())
    .then(json => {
        
        dispatch(receiveProducts(json, filters, state));
        console.log(json);
        // if (state.data){
        // history.push({pathname: '/products', 
        //             search: `${queryFilters ? '?'+queryFilters: ''}`, 
        //             state: state
        // })
        console.log('QUERY FILT ',state.meta.params);

        dispatch(urlChange(queryFilters, filters.config.loadMore))

        

    }).catch(error => console.log(error))
    // the recieved json objects need to be sent to 
    // dispatched to recieveProducts

}

export const shouldFetchProducts = (state, filters) => {
  // get the state of specific subreddit. 
//   const prods = state.fetchedProducts[filters.query]

//   console.log('prods', state.fetchedProducts)
//   console.log('params in fe', filters.query)
  return true
  // if (!prods) {
  //   // this occurs when posts are undefined.
  //   // they dont exist
  //   return true
  // }
  // if (prods.isFetching) {
  //   return false
  // }
}

export const fetchProductsIfNeeded = (filters) => (dispatch, getState) => {
  // getState() includes the selectedSubreddit and postsBySubreddit
  // the getState arg is retreived from the state inside component
  // at the time of this fn's execution.
  // console.log('filters',filters);
  
  if (shouldFetchProducts(getState(), filters)) {
    // dispatch(toggleFilter(filters.config.id, filters.config.field, filters.query))
    dispatch(fetchProducts(filters, getState().outcome))
  }
}