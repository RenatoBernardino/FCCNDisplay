import { createStore, combineReducers, applyMiddleware } from 'redux';
import interfaceReducer from '../reducers/interfaceReducer';
import { interfaceMiddleware } from '../middlewares/interfaceMiddleware';

const store = createStore(combineReducers({
    interface: interfaceReducer,
  }), applyMiddleware(interfaceMiddleware));

export default store;