import { combineReducers } from 'redux';
import filters from './filters';
import {outcome, fetchedProducts, filterUrl} from './products';

const  allReducers = combineReducers({ 
    outcome,
    filterUrl,
    fetchedProducts
});

export default allReducers;