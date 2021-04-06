/* генераторы экшенов */
import {ADD_TODO, COMPLETED_TODO, REMOVE_TODO, SET_PRIORITY_TO_TASK} from '../types';

export const addTodo = (id, text) => {
  return {
    type: ADD_TODO,
    payload: {
      id,
      text
    },
  };
};

export const removeTodo = (id) => {
  return {
    type: REMOVE_TODO,
    id
  };
};

export const completedTodo = (id) => {
  return {
    type: COMPLETED_TODO,
    id,
  };
};

export const setPriorityTodo = (id, elem) => {
  return {
    type: SET_PRIORITY_TO_TASK,
    id,
    elem,
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
