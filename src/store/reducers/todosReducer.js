import {
    SET_PRIORITY_TO_TASK,
    ADD_TODO,
    COMPLETED_TODO,
    REMOVE_TODO,
    CLEAR_TODO_LIST,
    TODOS_FETCH_DATA_SUCCESS
} from '../types';

const initialState = {
    allTodos: [],
};

export const todosReducer = (state = initialState, action) => {
    switch (action.type) {
        case TODOS_FETCH_DATA_SUCCESS: {
            return {
                ...state,
                allTodos: action.payload,
            }
        }
        case ADD_TODO:
            return {
                ...state,
                allTodos: [{
                    ...action.payload
                },
                    ...state.allTodos
                ],
                // allTodos: [
                //     {
                //         id: action.payload.id,
                //         text: action.payload.text,
                //         completed: false,
                //         color: action.payload.color,
                //         priority: action.payload.priority,
                //     },
                //
                //     ...state.allTodos,
                // ],
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

