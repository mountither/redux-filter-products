import uuid from 'react-uuid'

export const toggleFilter = (id, name, url, deselect) => ({
  type: 'TOGGLE_FILTER',
  id: id, 
  field:name,
  url: url,
  deselect: deselect
});

export const urlChange = (url) => ({
  type:"URL_CHANGE",
  url: url
})

export const clearFilters = () => ({
  type: 'CLEAR_FILTERS'
})

export const browserChange = (result) => ({
  type: 'WINDOW_NAV',
  oldState: result
})

export const initFilters = (params, url) => ({
  type: 'INIT_FILTER_UI',
  urlFilters: params,
  url: url
})

//make url persist in store. action => "URL_CHANGE"

export const requestProducts = (filters) =>({
  type: 'REQUEST_PRODUCTS',
  url: filters.query,
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
  })
  // the recieved json objects need to be sent to 
  // dispatched to recieveProducts

}

export const shouldFetchProducts = (state, filters) => {
  // get the state of specific subreddit. 
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