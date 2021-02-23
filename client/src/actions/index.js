
<<<<<<< HEAD

export const toggleFilter = (id, name, url) => ({
=======
export const toggleFilter = (id, name, url, deselect) => ({
>>>>>>> 5748739d08140cb22bd7d6a31a48514da5073396
  type: 'TOGGLE_FILTER',
  id: id, 
  field:name,
  url: url,
<<<<<<< HEAD
  
=======
  deselect: deselect
>>>>>>> 5748739d08140cb22bd7d6a31a48514da5073396
});

export const urlChange = (url) => ({
  type:"URL_CHANGE",
  url: url
})

export const clearFilters = () => ({
  type: 'CLEAR_FILTERS'
})

<<<<<<< HEAD
=======
export const browserChange = (result) => ({
  type: 'WINDOW_NAV',
  oldState: result
})

export const initFilters = (params, url) => ({
  type: 'INIT_FILTER_UI',
  urlFilters: params,
  url: url
})
>>>>>>> 5748739d08140cb22bd7d6a31a48514da5073396

//make url persist in store. action => "URL_CHANGE"

export const requestProducts = (filters) =>({
  type: 'REQUEST_PRODUCTS',
<<<<<<< HEAD
  url: filters.params,
});


export const receiveProducts = (json, filters) =>({
=======
  url: filters.query,
});

export const receiveProducts = (json, filters, results) =>({
>>>>>>> 5748739d08140cb22bd7d6a31a48514da5073396
  type: 'RECEIVE_PRODUCTS',
  data: json.prods,
  meta: {
    count: json.count,
    limit: filters.config.limit,
    skip: filters.config.skip,
    loadMore: filters.config.loadMore,
    page: filters.config.page,
<<<<<<< HEAD
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
=======
    params: results.meta.params,
    ui: results.filters,
  },
  url: filters.query
});

export const fetchProducts = (filters, ui) => (dispatch) => {
  //dispatch a request for products
  console.log('UIIIII', ui);
  dispatch(requestProducts(filters))
  // fetch the json product from server - port 8000
  return fetch(`${process.env.REACT_APP_SERVER}:8000/api/products/${filters.query ? filters.query : '?'}&skip=${filters.config.skip}&limit=${filters.config.limit}`)
  .then(response => response.json())
  .then(json => {dispatch(receiveProducts(json, filters, ui));
    // dispatch(urlChange(filters.params));
    console.log(json);
>>>>>>> 5748739d08140cb22bd7d6a31a48514da5073396
  })
  // the recieved json objects need to be sent to 
  // dispatched to recieveProducts

}

export const shouldFetchProducts = (state, filters) => {
  // get the state of specific subreddit. 
<<<<<<< HEAD
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
=======
  const prods = state.fetchedProducts[filters.query]

  console.log('prods', state.fetchedProducts)
  console.log('params in fe', filters.query)
  return true
  // if (!prods) {
  //   // this occurs when posts are undefined.
  //   // they dont exist
  //   return true
  // }
  // if (prods.isFetching) {
  //   return false
  // }
>>>>>>> 5748739d08140cb22bd7d6a31a48514da5073396
}

export const fetchProductsIfNeeded = (filters) => (dispatch, getState) => {
  // getState() includes the selectedSubreddit and postsBySubreddit
  // the getState arg is retreived from the state inside component
  // at the time of this fn's execution.
<<<<<<< HEAD
  console.log('filt config ',filters.config.params)
  if (shouldFetchProducts(getState(), filters)) {
    
    // dispatch(toggleFilter(filters.config.id, filters.config.field, filters.params))
    dispatch(fetchProducts(filters))
=======
  // console.log('filters',filters);
  if (shouldFetchProducts(getState(), filters)) {
    // dispatch(toggleFilter(filters.config.id, filters.config.field, filters.query))
    dispatch(fetchProducts(filters, getState().outcome))
>>>>>>> 5748739d08140cb22bd7d6a31a48514da5073396
  }
}