import { takeEvery, put, select, all, call, fork } from 'redux-saga/effects';
import { useLocation} from 'react-router-dom'
import {fetchProductsIfNeeded, fetchProducts, initFilters, urlChange, receiveProducts, requestProducts} from '../actions';
import qs from "query-string";
import {limitInit} from '../initialisation'

// this solves the issue of taking query direct from the window location, 
// rather than the redux router state.
// when the init_app dispatch is used, the router values will be present,
// we can alter and add the necessary values with this method.
function* initProductsPage() {
    // url location is extracted (select) from the state.router 

    // const params = new URLSearchParams(window.location.search);
    // console.log('PARAMS',qs.exclude(window.location.search, ['page']))
    const queryURL = qs.parse(window.location.search,{parseNumbers: true, arrayFormat: 'comma'});
    // const urlString = qs.stringify(window.location.search, {arrayFormat: 'comma', skipNull: true, skipEmptyString: true})

    const pageNo = parseInt(queryURL.page) || 1;

    // create an array of the items found in url.
    // const filters = Array.from(params.entries()).map((filter) => { return {id: parseInt(filter[1]), field:filter[0]}});
    // store the state router location retrieved from the url. 
    
    // problem:
            // when getting old state, the func iterates twice 
            // intial state is used for filters. 
            // yield all(filters.map((filter) =>  {return put(toggleFilter(filter.id, filter.field, params.toString()))}));
            
    // yield put(urlChange(window.location.search))

            
    if(Object.keys(queryURL).length> 0){

        Object.keys(queryURL).map( field =>
            queryURL[field]= Array.isArray(queryURL[field]) ? queryURL[field] : [queryURL[field]]
        )
        
        yield put(initFilters(queryURL))
    }        

    // yield put(fetchProductsIfNeeded({
    //     config: {
    //         skip: 0,
    //         limit: limitInit * pageNo,
    //         page: pageNo,
    //         success: false,
    //     }
    // }))

    yield put({type:'GET_PRODUCTS', 
            config: {
                skip: 0,
                limit: limitInit * pageNo,
                page: pageNo,
                initUrl: true,
            }
    })

    return;
}


export const getOutcome = (state) => state.outcome

function* processProducts(action){
    console.log('ACTION IN SAGA ',action);
    console.log('STATE IN SAGA ',yield select(getOutcome));

    try {
        // get the current state 
        let outcome = yield select(getOutcome);
        // strigfy the params found in state and send in url change
        const queryFilters = qs.stringify(outcome.meta.params,
            {arrayFormat: 'comma', skipNull: true, skipEmptyString: true});
        //call getProducts to return response. 
        const response = yield call(getProducts, queryFilters, action.config)
        // console.log(response);
        // check if success. if so, dispatch actions
        if (response.status >= 200 && response.status < 300) {    
            const products = yield response.json()
            yield put(requestProducts())
            yield put(receiveProducts(products, action.config, outcome))
            yield put(urlChange(queryFilters, {
                    urlConfig: 
                        {
                            loadMore: action.config.loadMore, 
                            initUrl: action.config.initUrl
                        }
                    }))
        }
        else{
            throw response.statusText;
        }

    } 
    catch (error) {
        console.log(error);
    }

}

const getProducts = (query, config) =>{
    

    const url = `${process.env.REACT_APP_SERVER}:8000/api/products/?${query}&skip=${config.skip}&limit=${config.limit}`
    
    // `${queryFilters ? '?'+queryFilters: ''}`
    const queryToServer = qs.exclude(url, ['page']);
    return fetch(queryToServer)
        .then(response => response)
}


//this the watcher in middleware. 
// focuses on action "INIT_APP".
// watcher saga will include other actions ('REQUEST_PRODUCTS') 
function* mySaga() {
    yield takeEvery("INIT_PRODUCTS", initProductsPage);
    yield takeEvery("GET_PRODUCTS", processProducts);

}

export default mySaga;