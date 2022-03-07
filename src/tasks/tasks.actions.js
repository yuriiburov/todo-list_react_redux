import { tasksListSelector } from './tasks.selectors';
import * as taskGateway from './tasksGateway';

export const TASKS_LIST_RECEIVED = 'TASKS_LIST_RECEIVED';

export const tasksListReceived = (tasksList) => ({
  type: TASKS_LIST_RECEIVED,
  payload: { tasksList },
});

export const getTaskList = () => {
  const thunkAction = (dispatch) => {
    taskGateway
      .fetchTasksList()
      .then((tasksList) => dispatch(tasksListReceived(tasksList)));
  };
  return thunkAction;
};

export const updateTask = (taskId) => {
  const thunkAction = (dispatch, getState) => {
    const state = getState();
    const tasksList = tasksListSelector(state);

    const task = tasksList.find((task) => task.id === taskId);
    const updatedTask = {
      ...task,
      done: !task.done,
    };

    taskGateway
      .updateTask(taskId, updatedTask)
      .then(() => dispatch(getTaskList()));
  };
  return thunkAction;
};

export const deleteTask = (taskId) => {
  const thunkAction = (dispatch) => {
    taskGateway.deleteTask(taskId).then(() => dispatch(getTaskList()));
  };
  return thunkAction;
};

export const createTask = (text) => {
  const thunkAction = (dispatch) => {
    const taskData = {
      text,
      done: false,
    };
    taskGateway.createTask(taskData).then(() => dispatch(getTaskList()));
  };
  return thunkAction;
};
