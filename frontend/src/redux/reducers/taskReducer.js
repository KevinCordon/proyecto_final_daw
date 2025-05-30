import {
    ADD_TASK,
    REMOVE_TASK,
    GET_TASKS,
    FETCH_TASKS_REQUEST,
    FETCH_TASKS_SUCCESS,
    FETCH_TASKS_FAILURE
} from '../actions/taskActions';

const initialState = {
    tasks: [],
    loading: false,
    error: null,
};

const taskReducer = (state = initialState, action) => {

    switch (action.type) {
        case FETCH_TASKS_REQUEST:
            return { ...state, loading: true, error: null };

        case FETCH_TASKS_SUCCESS:
        case GET_TASKS: // Agregamos este case también
            console.log('Tasks cargadas exitosamente:', action.payload);
            console.log('Cantidad de tasks recibidas:', action.payload?.length || 0);
            return {
                ...state,
                loading: false,
                tasks: action.payload,
                error: null
            };

        case FETCH_TASKS_FAILURE:
            console.log('Error al cargar tasks:', action.payload);
            return { ...state, loading: false, error: action.payload };

        case ADD_TASK:
            const newState = { ...state, tasks: [...state.tasks, action.payload] };
            return newState;

        case REMOVE_TASK:
            console.log('🗑Removiendo task con ID:', action.payload);
            const filteredTasks = state.tasks.filter(task => {
                const shouldKeep = task._id !== action.payload;
                if (!shouldKeep) {
                    console.log('Task encontrada para eliminar:', task);
                }
                return shouldKeep;
            });
            return {
                ...state,
                tasks: filteredTasks,
            };

        default:
            return state;
    }
};

export default taskReducer;