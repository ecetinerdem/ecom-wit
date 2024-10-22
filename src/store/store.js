import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux'; // Use legacy_createStore
import { thunk } from 'redux-thunk';
import logger from 'redux-logger';
import clientReducer from './reducers/clientReducer';
import productReducer from './reducers/productReducer';
import shoppingCartReducer from './reducers/shoppingCartReducer';

// Combine all reducers
const rootReducer = combineReducers({
  client: clientReducer,
  products: productReducer,
  shoppingCart: shoppingCartReducer,
});

// Create Redux store with Thunk and Logger middleware using legacy createStore
const store = createStore(
  rootReducer,
  applyMiddleware(thunk, logger)
);

export default store;
