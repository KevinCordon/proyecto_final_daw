import { createStore } from 'redux';
import goalReducer from './reducers/goalReducer';

const store = createStore(
  goalReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;