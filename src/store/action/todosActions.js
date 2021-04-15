/* генераторы экшенов */
import {ADD_TODO, CLEAR_TODO_LIST, COMPLETED_TODO, REMOVE_TODO, SET_PRIORITY_TO_TASK} from '../types';

export const addTodo = (id, text, color, count) => {
  return {
    type: ADD_TODO,
    payload: {
      id,
      text,
      color,
      count,
    },
  };
};

export const removeTodo = (id) => {
  return {
    type: REMOVE_TODO,
    payload: {
      id
    }
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

