import { combineReducers } from 'redux';
import goalReducer from './goalReducer';

const rootReducer = combineReducers({
    goals: goalReducer, // <- el nombre "goals" es lo que se accede en useSelector
});

export default rootReducer;