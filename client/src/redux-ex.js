import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux'

//ACTION
const increment = () => {
    return {
        type:'INCREASE'
    }
}

const decrement = () => {

    return {
        type: 'DECREASE'
    }
}

//REDUCER

const counter = (state = 0, action ) => {
 
    switch(action.type){
        case "INCREASE":
            return state + 1;
    
        case "DECREASE":
            return state - 1;
     }

}


//DISPATCH
let store = createStore(counter);


store.subscribe(() => console.log(store.getState()));

store.dispath(increment());