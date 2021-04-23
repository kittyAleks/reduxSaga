import {addTodo, clearTodoList, removeTodo, todosFetchDataSuccess} from "../action/todosActions";

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
// {
//     'id': '123',
//     'text': 'hhhh'
// }
export const createNewTodo = (newTodo) => {
    newTodo.id = undefined;
    newTodo.priority = 3;
    newTodo.createdAt = 10;
    return async dispatch => {
        console.log('QQQQ_JSON', JSON.stringify(newTodo))
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
                console.log('QQQ_todos', todos)
                dispatch(addTodo(todos))
            })
            .catch(error => console.log('Error', error))
    }
}

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
