<<<<<<< HEAD
import counterReducer from './counter'
import logReducer from './islogged'

import {combineReducers} from 'redux'


const allReducers = combineReducers({
    count: counterReducer,
    logged: logReducer

})

=======
import counterReducer from './counter'
import logReducer from './islogged'

import {combineReducers} from 'redux'


const allReducers = combineReducers({
    count: counterReducer,
    logged: logReducer

})

>>>>>>> 5748739d08140cb22bd7d6a31a48514da5073396
export default allReducers;