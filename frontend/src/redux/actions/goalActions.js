export const ADD_GOAL = 'ADD_GOAL';
export const REMOVE_GOAL = 'REMOVE_GOAL';

export const addGoal = (goal) => {
  return async (dispatch) => {
    try {
      const response = await fetch('http://localhost:5000/addGoal/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': '1234', // Replace with your actual API key
        },
        body: JSON.stringify({
          name: goal.name,
          description: goal.description,
          deadline: goal.dueDate,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        dispatch({
          type: ADD_GOAL,
          payload: data.goal,
        });
      } else {
        // Optionally handle error
        alert(data.error || 'Error adding goal');
      }
    } catch (error) {
      alert('Network error while adding goal');
    }
  };
};

export const removeGoal = (index) => ({
  type: REMOVE_GOAL,
  payload: index,
});