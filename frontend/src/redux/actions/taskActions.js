// redux/actions/taskActions.js
export const ADD_TASK = 'ADD_TASK';
export const REMOVE_TASK = 'REMOVE_TASK';
export const UPDATE_TASK = 'UPDATE_TASK';
export const GET_TASKS = 'GET_TASKS';
export const FETCH_TASKS_REQUEST = 'FETCH_TASKS_REQUEST';
export const FETCH_TASKS_SUCCESS = 'FETCH_TASKS_SUCCESS';
export const FETCH_TASKS_FAILURE = 'FETCH_TASKS_FAILURE';

// Obtener todas las tareas
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

            console.log('📡 Tasks Response status:', response.status);
            console.log('📡 Tasks Response ok:', response.ok);

            const data = await response.json();
            console.log('📦 Tasks data recibida del backend:', data);
            console.log('📊 Número de tasks recibidas:', data.length);

            if (response.ok) {
                console.log('✅ Dispatch exitoso - enviando tasks al reducer');
                dispatch({
                    type: FETCH_TASKS_SUCCESS,
                    payload: data,
                });
            } else {
                console.log('❌ Error en tasks response:', data.error);
                dispatch({
                    type: FETCH_TASKS_FAILURE,
                    payload: data.error || 'Error al obtener tasks'
                });
                alert(data.error || 'Error al obtener tasks');
            }
        } catch (error) {
            console.log('💥 Error de red en tasks:', error);
            dispatch({
                type: FETCH_TASKS_FAILURE,
                payload: 'Error de red al obtener tasks'
            });
            alert('Error de red al obtener tasks');
        }
    };
};

// Agregar nueva tarea
export const addTask = (task) => {
    return async (dispatch) => {
        console.log('➕ Agregando nueva task:', task);
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
                    priority: task.priority || 'medium',
                }),
            });

            const data = await response.json();
            console.log('📦 Add task response:', data);

            if (response.ok) {
                console.log('✅ Task agregada exitosamente');
                dispatch({
                    type: ADD_TASK,
                    payload: data.task,
                });
            } else {
                console.log('❌ Error al agregar task:', data.error);
                alert(data.error || 'Error adding task');
            }
        } catch (error) {
            console.log('💥 Error de red al agregar task:', error);
            alert('Network error while adding task');
        }
    };
};

// Actualizar tarea (completar/descompletar, editar)
export const updateTask = (taskId, updates) => {
    return async (dispatch) => {
        console.log('🔄 Actualizando task:', taskId, 'Updates:', updates);
        try {
            // Probar con diferentes rutas hasta encontrar la correcta
            const response = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': '1234',
                },
                // Solo enviar las actualizaciones en el body, no el ID
                body: JSON.stringify(updates),
            });

            const data = await response.json();
            console.log('📦 Update task response:', data);

            if (response.ok) {
                console.log('✅ Task actualizada exitosamente');
                dispatch({
                    type: UPDATE_TASK,
                    payload: data.task,
                });
            } else {
                console.log('❌ Error al actualizar task:', data.error);
                alert(data.error || 'Error updating task');
            }
        } catch (error) {
            console.log('💥 Error de red al actualizar task:', error);
            alert('Network error while updating task');
        }
    };
};
// Eliminar tarea
export const removeTask = (taskId) => {
    return async (dispatch) => {
        console.log('🗑️ Iniciando eliminación de task con ID:', taskId);

        try {
            const response = await fetch('http://localhost:5000/removeTask', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': '1234',
                },
                body: JSON.stringify({ id: taskId }),
            });

            console.log('📡 Remove task response status:', response.status);
            const data = await response.json();
            console.log('📦 Remove task response data:', data);

            if (response.ok) {
                console.log('✅ Task eliminada exitosamente del backend');
                dispatch({
                    type: REMOVE_TASK,
                    payload: taskId,
                });
                console.log('🔄 Dispatch REMOVE_TASK enviado con ID:', taskId);
            } else {
                console.log('❌ Error del backend al eliminar task:', data.error);
                alert(data.error || 'Error removing task');
            }
        } catch (error) {
            console.log('💥 Error de red al eliminar task:', error);
            alert('Network error while removing task');
        }
    };
};