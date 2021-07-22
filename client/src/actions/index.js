export const toggleFilter = (id, name, deselect) => ({
  type: 'TOGGLE_FILTER',
  id: id, 
  field:name,
  deselect: deselect
});

export const urlChange = (url, {urlConfig}) => ({
  type: urlConfig.loadMore ? "APPEND_PAGE_URL" : "REGISTER_URL",
  url: url,
  initUrl: urlConfig.initUrl || false
})

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

export const receiveProducts = (json, config, results) =>({
  type: 'RECEIVE_PRODUCTS',
  data: json.prods,
  meta: {
    count: json.count,
    limit: config.limit,
    skip: config.skip,
    loadMore: config.loadMore,
    page: config.page,
    params: results.meta.params,
  }
});