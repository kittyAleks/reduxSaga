import {clearTodoList} from "../store/action/todosActions";

export const clearAllTodos = () => {
    return async dispatch => {
        return fetch('https://6079a056460a6600174fc133.mockapi.io/api/v1/todos', {
            method: 'DELETE',
            headers: 'Content-Type: application/json; charset=utf-8'
        })
            .then(response => response.json())
            // .then(removedAllTodos => console.log('AAA_removedAllTodos', removedAllTodos))
            .then(removedAllTodos => dispatch(clearTodoList(removedAllTodos)))
            .catch(error => error.message)
    }
}
