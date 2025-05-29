import { ADD_GOAL, REMOVE_GOAL } from '../actions/goalActions';

const initialState = {
  goals: [],
};

export default function goalReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_GOAL:
      return {
        ...state,
        goals: [...state.goals, action.payload],
      };
    case REMOVE_GOAL:
      return {
        ...state,
        goals: state.goals.filter((_, index) => index !== action.payload),
      };
    default:
      return state;
  }
}
