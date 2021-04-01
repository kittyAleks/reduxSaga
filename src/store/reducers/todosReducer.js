import {ADD_TODO, COMPLETED_TODO, REMOVE_TODO} from '../types';

const initialState = {
  allTodos: [],
};

export const todosReducer = (state = initialState, action) => {
  console.log('EEE_action', action);
  switch (action.type) {
    case ADD_TODO:
      // Mutable way - NOT SUPPORTED BY REDUX
      // state.allTodos.push(
      //   {
      //     id: action.payload.id,
      //     text: action.payload.text,
      //     completed: false,
      //   });
      // return state;
      // Immutable way - RIGHT WAY FOR REDUX
    return {
      ...state,
      allTodos: [
        {
          id: action.payload.id,
          text: action.payload.text,
          completed: false,
        },
        ...state.allTodos,
      ],
    };
    case REMOVE_TODO:
      return {
        allTodos: state.allTodos.filter(todo => todo.id !== action.id),
      };

    case COMPLETED_TODO:
      return {
        allTodos: state.allTodos.map(todo =>
          todo.id === action.id ? {...todo, completed: !todo.completed} : todo,
        ),
      };

    default:
      return state;
  }
};

const redux = (action) => {
  const rootReducers = {
    todos: todosReducer,
  };
  const store = {
    todos: {},
  };
  for (const [reducerName, reducer] of Object.entries(rootReducers)) {
    const oldState = store[reducerName];
    const returnedState = reducer(oldState, action);
    // !!!!!!!!!!!!!!! ALWAYS RETURN NEW OBJECT FROM REDUCER WHEN DATA WAS CHANGED !!!!!!!!!!!!!!!!!!!!!!!!!!!
    // shallow compare
    if (oldState !== returnedState) {
      store[reducerName] = returnedState;
    }
  }
};

