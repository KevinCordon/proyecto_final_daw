import { createStore, applyMiddleware, compose } from 'redux';
import { combineReducers } from 'redux';
import { thunk } from 'redux-thunk';
import goalReducer from './reducers/goalReducer';
import taskReducer from './reducers/taskReducer'; // Agregar import

// Combinar reducers
const rootReducer = combineReducers({
    goals: goalReducer,
    tasks: taskReducer, // Agregar taskReducer
});

const composeEnhancers =
    (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;

const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
);

export default store;