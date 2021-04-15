import {SET_PRIORITY_TO_TASK, ADD_TODO, COMPLETED_TODO, REMOVE_TODO, CLEAR_TODO_LIST} from '../types';

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
                        color: action.payload.color,
                        count: action.payload.count
                    },

                    ...state.allTodos,
                ],
            };
        case REMOVE_TODO:
            return {
                allTodos: state.allTodos.filter(todo => todo.id !== action.payload.id),
            };

        case COMPLETED_TODO:
            return {
                allTodos: state.allTodos.map(todo =>
                    todo.id === action.payload.id ? {...todo, completed: !todo.completed} : todo,
                ),
            };
        case SET_PRIORITY_TO_TASK: {
            return {
                ...state,
                allTodos: state.allTodos.map(todo => todo.id === action.payload.id ? ({
                    ...todo,
                    selectedValue: action.payload.selectedValue,
                }) : todo)
            }
        }
        case CLEAR_TODO_LIST: {
            return {
                ...state,
                allTodos: []
            }
        }

        default:
            return state;
    }
};

