/* генераторы экшенов */
import {ADD_TODO, COMPLETED_TODO, REMOVE_TODO, SET_PRIORITY_TO_TASK} from '../types';

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


// export const removeUser = id => async dispatch => {
//   await DB.removeUser(id);
//   dispatch({
//     type: 'REMOVE_USER',
//     payload: id,
//   });
// };

// export const toggleTodo = (index) => {
//   return { type: TOGGLE_TODO, index }
// }
//
// export const setVisibilityFilter = (filter) => {
//   return { type: SET_VISIBILITY_FILTER, filter }
// }
