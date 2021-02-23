import counterReducer from './counter'
import logReducer from './islogged'

import {combineReducers} from 'redux'


const allReducers = combineReducers({
    count: counterReducer,
    logged: logReducer

})

export default allReducers;