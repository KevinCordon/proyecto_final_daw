export const ADD_GOAL = 'ADD_GOAL';
export const REMOVE_GOAL = 'REMOVE_GOAL';
export const GET_GOALS = 'GET_GOALS';
export const FETCH_GOALS_REQUEST = 'FETCH_GOALS_REQUEST';
export const FETCH_GOALS_SUCCESS = 'FETCH_GOALS_SUCCESS';
export const FETCH_GOALS_FAILURE = 'FETCH_GOALS_FAILURE';

export const getGoals = () => {
  return async (dispatch) => {
    console.log('🚀 Iniciando petición getGoals...');
    dispatch({ type: FETCH_GOALS_REQUEST });

    try {
      const response = await fetch('http://localhost:5000/getGoals', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': '1234',
        },
      });

      const data = await response.json();
      console.log('Data recibida del backend:', data);
      console.log('Número de goals recibidos:', data.length);

      if (response.ok) {
        dispatch({
          type: FETCH_GOALS_SUCCESS,
          payload: data,
        });
      } else {
        console.log('Error en response:', data.error);
        dispatch({
          type: FETCH_GOALS_FAILURE,
          payload: data.error || 'Error al obtener goals'
        });
        alert(data.error || 'Error al obtener goals');
      }
    } catch (error) {
      console.log('Error de red:', error);
      dispatch({
        type: FETCH_GOALS_FAILURE,
        payload: 'Error de red al obtener goals'
      });
      alert('Error de red al obtener goals');
    }
  };
};

export const addGoal = (goal) => {
  return async (dispatch) => {
    try {
      const response = await fetch('http://localhost:5000/addGoal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': '1234',
        },
        body: JSON.stringify({
          name: goal.name,
          description: goal.description,
          dueDate: goal.dueDate ? goal.dueDate.toISOString() : null,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        dispatch({
          type: ADD_GOAL,
          payload: data.goal,
        });
        dispatch(getGoals());
      } else {
        alert(data.error || 'Error adding goal');
      }
    } catch (error) {
      alert('Network error while adding goal');
    }
  };
};

export const removeGoal = (goalId) => {
  return async (dispatch) => {
    console.log('Iniciando eliminación de goal con ID:', goalId);

    try {
      const response = await fetch('http://localhost:5000/removeGoal', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': '1234',
        },
        body: JSON.stringify({ id: goalId }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Goal eliminado del backend');
        dispatch({
          type: REMOVE_GOAL,
          payload: goalId,
        });
      } else {
        alert(data.error || 'Error removing goal');
      }
    } catch (error) {
      alert('Network error while removing goal');
    }
  };
};