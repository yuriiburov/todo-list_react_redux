import { TASKS_LIST_RECEIVED } from './tasks.actions';

const initialState = {
  tasksList: [],
};

const tasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case TASKS_LIST_RECEIVED:
      return {
        ...state,
        tasksList: [...action.payload.tasksList],
      };
    default:
      return state;
  }
};

export default tasksReducer;
