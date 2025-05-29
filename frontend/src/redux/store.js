import { createStore, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';
import goalReducer from './reducers/goalReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    goalReducer,
    composeEnhancers(applyMiddleware(thunk))
);

export default store;
