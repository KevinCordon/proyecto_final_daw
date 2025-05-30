import {
  ADD_GOAL,
  REMOVE_GOAL,
  FETCH_GOALS_REQUEST,
  FETCH_GOALS_SUCCESS,
  FETCH_GOALS_FAILURE
} from '../actions/goalActions';

const initialState = {
  goals: [],
  loading: false,
  error: null,
};

const goalReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_GOALS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_GOALS_SUCCESS:
      return { ...state, loading: false, goals: action.payload };
    case FETCH_GOALS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case ADD_GOAL:
      return { ...state, goals: [...state.goals, action.payload] };
    case REMOVE_GOAL:
      return {
        ...state,
        goals: state.goals.filter(goal => goal._id !== action.payload),
      };
    default:
      return state;
  }
};

export default goalReducer;
