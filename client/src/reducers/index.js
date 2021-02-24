import { combineReducers } from 'redux';
import {outcome, fetchedProducts, filterUrl} from './ProductFilterReducer';

const  allReducers = combineReducers({ 
    outcome,
    filterUrl
});

export default allReducers;