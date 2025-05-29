export const ADD_GOAL = 'ADD_GOAL';
export const REMOVE_GOAL = 'REMOVE_GOAL';

export const addGoal = (goal) => ({
  type: ADD_GOAL,
  payload: goal,
});

export const removeGoal = (index) => ({
  type: REMOVE_GOAL,
  payload: index,
});