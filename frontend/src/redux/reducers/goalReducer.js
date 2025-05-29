import { ADD_GOAL, REMOVE_GOAL } from '../actions/goalActions';

const initialState = {
  goals: [
    {
        name: "Proyecto de Curso de desarrollo web",
        description: "Elaborar una aplicación web responsive en la que se pueda llevar control de mis metas y tareas personales",
        dueDate: "31/05/2024"
      },
      {
        name: "Terminar de leer libro",
        description: "Finalizar mi libro de React",
        dueDate: "31/05/2024"
      },
      {
        name: "Subir Actividad 1",
        description: "Responder el test en el GES correspondiente a la actividad 1",
        dueDate: "31/05/2024"
      },
      {
        name: "Contestar test relacionado a la actividad 1",
        description: "Ingresar al GES y responder test relacionado a la actividad 1",
        dueDate: "31/05/2024"
      }
  ],
};

const goalReducer = (state = initialState, action) => {
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
};

export default goalReducer;
