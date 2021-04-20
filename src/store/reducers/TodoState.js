import {addTodo, todosFetchDataSuccess} from "../action/todosActions";

export const fetchTodo = () => {
    return async dispatch => {
        await fetch('https://6079a056460a6600174fc133.mockapi.io/api/v1/todos', {
            headers: 'Content-Type-application/json',
        })
            .then(jsonData => jsonData.json())
            .then(fetchTodos => dispatch(todosFetchDataSuccess(fetchTodos)))
            .catch(error => console.log('Error', error))
    }
}

export const createNewTodo = (newTodo) => {
    console.log("QQQ__newTodo", newTodo)
    return async dispatch => {
        await fetch('https://6079a056460a6600174fc133.mockapi.io/api/v1/todos', {
            method: 'POST',
            headers: 'Content-Type-application/json',
            body: JSON.stringify({newTodo})
        })
            .then(response => response.json())
            .then(todos => dispatch(addTodo(todos)))
            .catch(error => console.log('Error', error))
    }
}
