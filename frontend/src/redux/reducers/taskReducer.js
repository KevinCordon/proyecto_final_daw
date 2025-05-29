import { ADD_TASK, REMOVE_TASK } from '../actions/taskActions';

const initialState = {
    tasks: [],
};

export default function goalReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_TASK:
            return {
                ...state,
                goals: [...state.goals, action.payload],
            };
        case REMOVE_TASK:
            return {
                ...state,
                goals: state.goals.filter((_, index) => index !== action.payload),
            };
        default:
            return state;
    }
}
