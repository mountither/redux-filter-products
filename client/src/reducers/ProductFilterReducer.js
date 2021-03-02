import { useDebugValue } from 'react';
import { combineReducers } from 'redux';
import {initState} from '../initialisation'
import history from '../utils/history'

// export const filterUrl = (state = '', action) => {
//   switch (action.type) {
//     case "URL_CHANGE":
//       return action.url
//     default:
//       return state
//   }
// }

// params: filterInfo.map(filterType => {
//     return {
//         [filterType.field_name] : []
//     }
// })
export const outcome = (state = initState, action) => {
    switch (action.type) {
        case 'INIT_FILTER_UI':
            // exclude page from params obj, since its not needed after init (page in state will be used)
            const {page, ...updatedParams} = action.urlFilters
            return {
                ...state,
                meta: {
                ...state.meta,
                params: {...state.meta.params, ...updatedParams},
                },
                filters: state.filters.map( filter => {
                    const foundField = Object.keys(action.urlFilters).find(field => 
                        field === filter.field_name
                    )
                    if(foundField){
                        return{
                        ...filter,
                        // filter_triggered: action.urlFilters[field].length>0? true,
                        input: filter.input.map((dataInput) => {
                            // console.log('ACT FILT',action.urlFilters[filter.field_name] === dataInput.id);

                        const foundInput = Array.isArray(action.urlFilters[filter.field_name]) ? 
                            action.urlFilters[filter.field_name].find((input) => input == dataInput.id) 
                            : 
                            action.urlFilters[filter.field_name] === dataInput.id;

                        if(foundInput){
                            return {
                            ...dataInput,
                            active: true,
                            }
                        }
                        return dataInput
                        }),
                        }
                    }
                    return filter
                }),
            }
        case 'TOGGLE_FILTER':
        // console.log('toggle act',{...state.meta.params, [action.field]: action.deselect ? state.meta.params[action.field].splice(action.id, 1): [action.id]});
            return {
                ...state,
                meta: {
                ...state.meta,
                params: {
                    ...state.meta.params,
                    [action.field]: action.deselect ? state.meta.params[action.field].filter(input => input != action.id)
                    : [...state.meta.params[action.field], action.id]
                },
                status: 'TOGGLING_UI',
                },
                filters: state.filters.map((filter) =>{
                if(filter.field_name === action.field){
                return {
                    ...filter,
                    input: filter.input.map((dataInput) => {
                    if(dataInput.id === action.id){
                        return {
                        ...dataInput,
                        active: action.deselect ? false : true,
                        }
                    }
                    return dataInput
                    }),
                    // filter_triggered: true
                }
                }
                return filter;
            },
            ),
            }
        case 'REQUEST_PRODUCTS':
            return {
                ...state,
                isFetching: true,
            }
        case 'RECEIVE_PRODUCTS':
            // console.log('act in receive',Object.keys(action.meta.params)[0])
            console.log('state parrams in recieve',state.meta);
            return {
                ...state,
                meta: {
                    ...state.meta,
                    count: action.meta.count,
                    // page: action.meta.loadMore ? state.meta.page + 1 : action.meta.page,
                    page: action.meta.page,
                    skip: action.meta.skip,
                    // skip: action.meta.loadMore ? action.meta.skip + state.meta.limit : 0,
                    limit: action.meta.limit,
                    loadMore: action.meta.loadMore,
                    params: action.meta.params,
                },
            //   filters: action.meta.ui,
                isFetching: false,
                data: action.meta.loadMore ? [...state.data, ...action.data]: action.data,
            }
        case 'WINDOW_NAV':
            // console.log('ACT OLD STATE',state);
            return action.oldState && Object.keys(action.oldState).length ? action.oldState : state;
        case 'REGISTER_URL':
            if(window.history){
                // history.push({pathname: '/products', search: action.url, state:state})
                console.log('PUSHED INTO HIST!!', state, action);
                console.log('OBJECT KEYS IN PARAMS',Object.keys(state.meta.params).some((filter) => state.meta.params[filter].length));

                //  push state keeps old entry in browser. non-mutated state

                if(!action.initUrl){

                    window.history.pushState({state: state}, '', `/products/${
                        Object.keys(state.meta.params).some((filter) => state.meta.params[filter].length) 
                        ? 
                        '?'+action.url: ''}`)
                }   
                else{
                    //  when the page loads without 
                    window.history.replaceState({state: state}, '',  `/products/${
                        action.url
                        ?
                        '?'+action.url: ''}`
                    )
                }
            
            }
            // after completing state manip. return current state. If not, the state will not be realised by other actions
            return state

        case 'APPEND_PAGE_URL':
            console.log('STATE IN URL CHNA',action.url);
            if(window.history){
                // window.history.replaceState({state: state}, '', `?${action.url ? action.url+'&' : ''}${'page='+state.meta.page}`)
                window.history.replaceState({state: state}, '', `/products/?${action.url ? action.url+'&': ''}page=${state.meta.page}`)
            }
            return state
        // case 'CLEAR_FILTERS':
        //     return {...state, data: [], filters: []}
        default:
            return state
    }
} 

// export const fetchedProducts = (state = {}, action) =>{
//   switch (action.type) {
//     case 'INIT_FILTE_UI':
//     // case 'TOGGLE_FILTER':
//     // case 'REQUEST_PRODUCTS':
//     // case 'RECEIVE_PRODUCTS': 
//       console.log(`%c OUTCOME FUNC. : ${action.type}, ${ action.url}`,'background: #222; color: #bada55')
//       return {
//         oldState: outcome(state[action.url], action)
//       }
//       default: 
//           return state;

// }

// }


