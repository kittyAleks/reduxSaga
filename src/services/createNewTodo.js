import {addTodo} from "../store/action/todosActions";

export const createNewTodo = (newTodo) => {
    return async dispatch => {
        await fetch('https://6079a056460a6600174fc133.mockapi.io/api/v1/todos', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTodo)
        })
            .then(response => response.json())
            .then(todos => {
                dispatch(addTodo(todos))
            })
            .catch(error => console.log('Error', error))
    }
}
