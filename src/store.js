import { createStore } from 'redux'
import { reducer } from './reducer'

const initialState = {
    DynamicGlobalProperties:null,
    Price: 0.00008017
}

export const store = createStore( reducer, initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() 
);