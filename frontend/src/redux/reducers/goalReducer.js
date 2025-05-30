import {
  ADD_GOAL,
  REMOVE_GOAL,
  GET_GOALS, // Agregamos este import
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
    case GET_GOALS: // Agregamos este case también
      console.log('Goals cargados exitosamente:', action.payload);
      console.log('Cantidad de goals recibidos:', action.payload?.length || 0);
      return {
        ...state,
        loading: false,
        goals: action.payload,
        error: null
      };

    case FETCH_GOALS_FAILURE:
      console.log('Error al cargar goals:', action.payload);
      return { ...state, loading: false, error: action.payload };

    case ADD_GOAL:
      const newState = { ...state, goals: [...state.goals, action.payload] };
      return newState;

    case REMOVE_GOAL:
      console.log('🗑Removiendo goal con ID:', action.payload);
      const filteredGoals = state.goals.filter(goal => {
        const shouldKeep = goal._id !== action.payload;
        if (!shouldKeep) {
          console.log('Goal encontrado para eliminar:', goal);
        }
        return shouldKeep;
      });
      return {
        ...state,
        goals: filteredGoals,
      };

    default:
      return state;
  }
};

export default goalReducer;