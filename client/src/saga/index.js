import { takeEvery, put, select, all, call, fork } from 'redux-saga/effects';
import { useLocation} from 'react-router-dom'
import {fetchProductsIfNeeded, fetchProducts, initFilters,urlChange} from '../actions';
import qs from "query-string";

// this solves the issue of taking query direct from the window location, 
// rather than the redux router state.
// when the init_app dispatch is used, the router values will be present,
// we can alter and add the necessary values with this method.
function* initApp(action) {
    // url location is extracted (select) from the state.router 

    // const params = new URLSearchParams(window.location.search);
    // console.log('PARAMS',qs.exclude(window.location.search, ['page']))
    const queryURL = qs.parse(window.location.search,{parseNumbers: true, arrayFormat: 'comma'});
    // const urlString = qs.stringify(window.location.search, {arrayFormat: 'comma', skipNull: true, skipEmptyString: true})

    const queryToServer = qs.exclude(window.location.search, ['page']);
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

    yield put(fetchProductsIfNeeded({
        // query: queryToServer,
        config: {
            skip: 0,
            limit: 4 * pageNo,
            page: pageNo
        }
    }))


    return;
}



//this the watcher in middleware. 
// focuses on action "INIT_APP".
function* mySaga() {
    yield takeEvery("INIT_PRODUCTS", initApp);
}

export default mySaga;