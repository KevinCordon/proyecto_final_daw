import { combineReducers } from 'redux';
import goalReducer from './goalReducer';

const rootReducer = combineReducers({
    goals: goalReducer,
});

export default rootReducer;