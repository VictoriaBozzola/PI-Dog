import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../reducer/reducer.js';
import thunk from 'redux-thunk';
// import {composeWithDevTools} from 'redux-devtools-extension'

const store = createStore(rootReducer,applyMiddleware(thunk));

export default store
