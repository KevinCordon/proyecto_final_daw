export const ADD_TASK = 'ADD_TASK';
export const REMOVE_TASK = 'REMOVE_TASK';
export const GET_TASKS = 'GET_TASKS';
export const FETCH_TASKS_REQUEST = 'FETCH_TASKS_REQUEST';
export const FETCH_TASKS_SUCCESS = 'FETCH_TASKS_SUCCESS';
export const FETCH_TASKS_FAILURE = 'FETCH_TASKS_FAILURE';

export const getTasks = () => {
    return async (dispatch) => {
        console.log('🚀 Iniciando petición getTasks...');
        dispatch({ type: FETCH_TASKS_REQUEST });

        try {
            const response = await fetch('http://localhost:5000/getTasks', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': '1234',
                },
            });

            const data = await response.json();
            console.log('Data recibida del backend:', data);
            console.log('Número de tasks recibidas:', data.length);

            if (response.ok) {
                dispatch({
                    type: FETCH_TASKS_SUCCESS,
                    payload: data,
                });
            } else {
                console.log('Error en response:', data.error);
                dispatch({
                    type: FETCH_TASKS_FAILURE,
                    payload: data.error || 'Error al obtener tasks'
                });
                alert(data.error || 'Error al obtener tasks');
            }
        } catch (error) {
            console.log('Error de red:', error);
            dispatch({
                type: FETCH_TASKS_FAILURE,
                payload: 'Error de red al obtener tasks'
            });
            alert('Error de red al obtener tasks');
        }
    };
};

export const addTask = (task) => {
    return async (dispatch) => {
        try {
            const response = await fetch('http://localhost:5000/addTask', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': '1234',
                },
                body: JSON.stringify({
                    name: task.name,
                    description: task.description,
                    dueDate: task.dueDate ? task.dueDate.toISOString() : null,
                }),
            });

            const data = await response.json();
            if (response.ok) {
                dispatch({
                    type: ADD_TASK,
                    payload: data.task,
                });
                dispatch(getTasks());
            } else {
                alert(data.error || 'Error adding task');
            }
        } catch (error) {
            alert('Network error while adding task');
        }
    };
};

export const removeTask = (taskId) => {
    return async (dispatch) => {
        console.log('Iniciando eliminación de task con ID:', taskId);

        try {
            const response = await fetch('http://localhost:5000/removeTask', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': '1234',
                },
                body: JSON.stringify({ id: taskId }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Task eliminada del backend');
                dispatch({
                    type: REMOVE_TASK,
                    payload: taskId,
                });
            } else {
                alert(data.error || 'Error removing task');
            }
        } catch (error) {
            alert('Network error while removing task');
        }
    };
};