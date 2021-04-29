/* генераторы экшенов */
import {
  ADD_TODO,
  CLEAR_TODO_LIST,
  COMPLETED_TODO,
  REMOVE_TODO,
  SET_PRIORITY_TO_TASK,
  UPDATE_TODO_COLOR,
  UPDATE_TODO_TEXT
} from '../types';

export const todosFetchDataSuccess = (fetchTodos) => {
  return {
    type: 'TODOS_FETCH_DATA_SUCCESS',
    payload: fetchTodos,
  }
}

export const addTodo = (newTodo) => {
  return {
    type: ADD_TODO,
    payload: newTodo
  };
};

export const updateTodoText = (updateTodo) => {
  return {
    type: UPDATE_TODO_TEXT,
    updateTodo,
  };
};

export const updateTodoColor = (updatedTodo) => {
  console.log('EEE_ACTION_updatedTodo', updatedTodo)
  return {
    type: UPDATE_TODO_COLOR,
    updatedTodo
  }
}

export const removeTodo = (removedTodo) => {
  return {
    type: REMOVE_TODO,
    payload: removedTodo
  };
};

export const completedTodo = (id) => {
  return {
    type: COMPLETED_TODO,
    payload: {
      id,
    }
  };
};

export const setPriorityTodo = (id, selectedValue) => {
  return {
    type: SET_PRIORITY_TO_TASK,
    payload: {
      id,
      selectedValue,
    },
  };
};

export const clearTodoList = () => {
  return {
    type: CLEAR_TODO_LIST,
  };
};

