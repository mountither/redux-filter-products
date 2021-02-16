

export const toggleFilter = (id, name, url) => ({
  type: 'TOGGLE_FILTER',
  id: id, 
  field:name,
  url: url,
  
});

export const urlChange = (url) => ({
  type:"URL_CHANGE",
  url: url
})

export const clearFilters = () => ({
  type: 'CLEAR_FILTERS'
})


//make url persist in store. action => "URL_CHANGE"

export const requestProducts = (filters) =>({
  type: 'REQUEST_PRODUCTS',
  url: filters.params,
});


export const receiveProducts = (json, filters) =>({
  type: 'RECEIVE_PRODUCTS',
  data: json.prods,
  meta: {
    count: json.count,
    limit: filters.config.limit,
    skip: filters.config.skip,
    loadMore: filters.config.loadMore,
    page: filters.config.page,
    params: filters.config.params
  },
  url: filters.params
});

export const fetchProducts = (filters) => (dispatch) => {
  //dispatch a request for products
  dispatch(requestProducts(filters))
  // fetch the json product from server - port 8000
  return fetch(`${process.env.REACT_APP_SERVER}:8000/api/products/?${filters.params}&skip=${filters.config.skip}&limit=${filters.config.limit}`)
  .then(response => response.json())
  .then(json => {dispatch(receiveProducts(json, filters));
    // dispatch(urlChange(filters.params));
  })
  // the recieved json objects need to be sent to 
  // dispatched to recieveProducts

}

export const shouldFetchProducts = (state, filters) => {
  // get the state of specific subreddit. 
  const prods = state.fetchedProducts[filters.params]
  
  console.log('prods', state.fetchedProducts)
  console.log('params in fe', filters.params)

  if (!prods) {
    // this occurs when posts are undefined.
    // they dont exist
    return true
  }
  if (prods.isFetching) {
    return false
  }
}

export const fetchProductsIfNeeded = (filters) => (dispatch, getState) => {
  // getState() includes the selectedSubreddit and postsBySubreddit
  // the getState arg is retreived from the state inside component
  // at the time of this fn's execution.
  console.log('filt config ',filters.config.params)
  if (shouldFetchProducts(getState(), filters)) {
    
    // dispatch(toggleFilter(filters.config.id, filters.config.field, filters.params))
    dispatch(fetchProducts(filters))
  }
}