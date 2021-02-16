import { combineReducers } from 'redux';
import {filterInfo} from '../filters/productFilters'


export const filterUrl = (state = '', action) => {
  switch (action.type) {
    case "URL_CHANGE":
      return action.url
    default:
      return state
  }
}

export const outcome = (state = {
  isFetching: false,
  data: [],
  filters: filterInfo,
  meta: {
    limit:4,          
    skip:0,
    page: 1,
    loadMore: false,
    params: {}
  },
}, action) => {
    switch (action.type) {
      // case 'TOGGLE_FILTER':
      //   return {
      //     ...state,
      //     filters: state.filters.map((filter) =>{
      //     if(filter.field_name === action.field){
      //       return {
      //         ...filter,
      //         input: filter.input.map((dataInput) => {
      //           if(dataInput.id === action.id){
      //             return {
      //               ...dataInput,
      //               active: dataInput.active ? false : true,
      //             }
      //           }
      //           return dataInput
      //         }),
      //         filter_triggered: true
      //       }
      //     }
      //     return filter;
      //   },
      //   ),
      //   }
        
      case 'REQUEST_PRODUCTS':
        return {
          ...state,
          isFetching: true,
        }
      case 'RECEIVE_PRODUCTS':
        console.log('act in receive',Object.values(action.meta.params)[0])
        return {
          ...state,
          meta: {
            count: action.meta.count,
            page: action.meta.loadMore ? state.meta.page + 1 : action.meta.page, 
            skip: action.meta.loadMore ? action.meta.skip + action.meta.limit: 0,
            limit: action.meta.limit,
            loadMore: action.meta.loadMore,
            params: action.meta.params
          },
          filters: state.filters.map((filter) =>{
            if(filter.field_name === Object.keys(action.meta.params)[0]){
              return {
                ...filter,
                filter_triggered: true,
                input: filter.input.map((dataInput) => {
                  if(dataInput.id === parseInt(Object.values(action.meta.params)[0])){
                    return {
                      ...dataInput,
                      active: true,
                    }
                  }
                  return dataInput
                }),
                
              }
            }
            return filter;
          },
          ),
          isFetching: false,
          data: action.meta.loadMore ? [...state.data, ...action.data]: action.data,

      }
      default:
        return state
    }
} 

export const fetchedProducts = (state = {}, action) =>{
  switch (action.type) {
    case 'TOGGLE_FILTER':
    case 'REQUEST_PRODUCTS':
    case 'RECEIVE_PRODUCTS':  
      console.log('action filters in fetched: ', action)
      return {
          ...state,
          [action.url]: outcome(state[action.url], action)

      }
      default: 
          return state;

}

}


