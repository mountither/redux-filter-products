import { combineReducers } from 'redux';
import {outcome, fetchedProducts, filterUrl} from './ProductFilterReducer';

const  allReducers = combineReducers({ 
    outcome,
    filterUrl,
    fetchedProducts
});

export default allReducers;