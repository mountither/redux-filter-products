import { applyMiddleware, compose, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import mySaga from '../saga'
import allReducers from "../reducers";
import { createLogger } from 'redux-logger'

const middleware = []
if (process.env.NODE_ENV !== 'production') {
    middleware.push(createLogger());
}

const sagaMiddleware = createSagaMiddleware();
middleware.push(sagaMiddleware)

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(allReducers,
    applyMiddleware(...middleware),
    );
    
sagaMiddleware.run(mySaga);

export default store;