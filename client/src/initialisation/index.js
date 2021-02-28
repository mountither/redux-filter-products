import {filterInfo, allParams} from './filterInfo'

export const initState = {
    isFetching: false,
    data: [],
    filters: filterInfo,
    meta: {
      limit:4,          
      skip:0,
      page: 1,
      loadMore: false,
      params: allParams,
      success: false,
}
}

export const pageInit = initState.meta.page;
export const limitInit = initState.meta.limit;
