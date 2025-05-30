// redux/reducers/taskReducer.js
import {
    ADD_TASK,
    REMOVE_TASK,
    UPDATE_TASK,
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
    console.log('🔄 Task Reducer - Action Type:', action.type);
    console.log('📋 Task Reducer - Payload:', action.payload);
    console.log('📊 Task Reducer - Current State:', state);

    switch (action.type) {
        case FETCH_TASKS_REQUEST:
            console.log('⏳ Iniciando carga de tasks...');
            return { ...state, loading: true, error: null };

        case FETCH_TASKS_SUCCESS:
        case GET_TASKS:
            console.log('✅ Tasks cargadas exitosamente:', action.payload);
            console.log('🔢 Cantidad de tasks recibidas:', action.payload?.length || 0);
            return {
                ...state,
                loading: false,
                tasks: action.payload,
                error: null
            };

        case FETCH_TASKS_FAILURE:
            console.log('❌ Error al cargar tasks:', action.payload);
            return { ...state, loading: false, error: action.payload };

        case ADD_TASK:
            console.log('➕ Agregando nueva task:', action.payload);
            const newStateAdd = { ...state, tasks: [...state.tasks, action.payload] };
            console.log('📈 Estado después de agregar task:', newStateAdd);
            return newStateAdd;

        case UPDATE_TASK:
            console.log('🔄 Actualizando task:', action.payload);
            const updatedTasks = state.tasks.map(task =>
                task._id === action.payload._id ? action.payload : task
            );
            console.log('📝 Tasks después de actualizar:', updatedTasks);
            return {
                ...state,
                tasks: updatedTasks,
            };

        case REMOVE_TASK:
            console.log('🗑️ Removiendo task con ID:', action.payload);
            console.log('📋 Tasks antes de filtrar:', state.tasks);
            const filteredTasks = state.tasks.filter(task => {
                const shouldKeep = task._id !== action.payload;
                if (!shouldKeep) {
                    console.log('🎯 Task encontrada para eliminar:', task);
                }
                return shouldKeep;
            });
            console.log('📉 Tasks después de remover:', filteredTasks);
            console.log('🔢 Cantidad antes:', state.tasks.length, '- Cantidad después:', filteredTasks.length);
            return {
                ...state,
                tasks: filteredTasks,
            };

        default:
            console.log('🤷‍♂️ Task Action type no reconocido:', action.type);
            return state;
    }
};

export default taskReducer;