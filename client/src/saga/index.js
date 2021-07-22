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

    const queryURL = qs.parse(window.location.search,{parseNumbers: true, arrayFormat: 'comma'});

    const pageNo = parseInt(queryURL.page) || 1;

            
    if(Object.keys(queryURL).length> 0){

        Object.keys(queryURL).map( field =>
            queryURL[field]= Array.isArray(queryURL[field]) ? queryURL[field] : [queryURL[field]]
        )
        
        yield put(initFilters(queryURL))
    }        

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

    try {
        // get the current state 
        let outcome = yield select(getOutcome);
        
        // strigfy the params found in state and send in url change
        const queryFilters = qs.stringify(outcome.meta.params,
            {arrayFormat: 'comma', skipNull: true, skipEmptyString: true});
        
            //call getProducts to return response. 
        const response = yield call(getProducts, queryFilters, action.config)

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