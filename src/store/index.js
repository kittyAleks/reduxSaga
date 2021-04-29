import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import { todosReducer } from "./reducers/todosReducer";
import { createMigrate, persistReducer, persistStore } from "redux-persist";
import AsyncStorage from "@react-native-community/async-storage";
import reduxLogger from "redux-logger";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  todos: todosReducer,
});
const migrations = {
  1: (oldState) => {
    // migration clear out device state
    return {
      ...oldState,
      todos: {
        data: oldState.todos.allTodos,
        selected: undefined,
      },
    };
  },
  2: (oldState) => {
    // migration to keep only device state
    return {
      ...oldState,
      tasks: {
        data: oldState.todos.data,
        selected: oldState.todos.selected,
      },
    };
  },
};
export const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  version: 0,
  migrate: createMigrate(migrations),
};

const persistingReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persistingReducer,
  compose(applyMiddleware(thunk, reduxLogger))
);
export const persistor = persistStore(store, persistingReducer);
export const { dispatch } = store;
