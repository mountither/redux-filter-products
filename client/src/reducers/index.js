import { combineReducers } from 'redux';
<<<<<<< HEAD
import filters from './filters';
import {outcome, fetchedProducts, filterUrl} from './products';
=======
import {outcome, fetchedProducts, filterUrl} from './ProductFilterReducer';
>>>>>>> 5748739d08140cb22bd7d6a31a48514da5073396

const  allReducers = combineReducers({ 
    outcome,
    filterUrl,
    fetchedProducts
});

export default allReducers;