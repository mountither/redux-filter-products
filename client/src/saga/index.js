import { takeEvery, put, select, all, call } from 'redux-saga/effects';
import { useLocation} from 'react-router-dom'
import {fetchProductsIfNeeded, toggleFilter, urlChange} from '../actions';
import { filterInfo } from '../filters/productFilters';
import qs from "query-string";

// this solves the issue of taking query direct from the window location, 
// rather than the redux router state.
// when the init_app dispatch is used, the router values will be present,
// we can alter and add the necessary values with this method.
function* initApp(action) {
    // url location is extracted (select) from the state.router 

    const params = new URLSearchParams(window.location.search);
    console.log('PARAMS',params.toString())

    const pageNo = parseInt(params.get('page')) || 1;

    // create an array of the items found in url.
    const filters = Array.from(params.entries()).map((filter) => { return {id: parseInt(filter[1]), field:filter[0]}});
    // store the state router location retrieved from the url. 
    
    // problem:
            // when getting old state, the func iterates twice 
            // intial state is used for filters. 
    // yield all(filters.map((filter) =>  {return put(toggleFilter(filter.id, filter.field, params.toString()))}));
    console.log('filters', qs.parse(params.toString()))
    // yield put(urlChange(params.toString()))
    yield put(fetchProductsIfNeeded({
        params: params.toString(),
        config: {skip: 0, 
        limit: 4 * pageNo,
        page: pageNo,
        // id: 1,
        // field: 'brand'
        params: qs.parse(params.toString())
      }}))



    return;
}


//this the watcher in middleware. 
// focuses on action "INIT_APP".
function* mySaga() {
    yield takeEvery("INIT_PRODUCTS", initApp);
}

export default mySaga;