import {todosFetchDataSuccess} from "../store/action/todosActions";

export const fetchTodo = () => {
    return async dispatch => {
        await fetch('https://6079a056460a6600174fc133.mockapi.io/api/v1/todos', {
            headers: 'Content-Type-application/json',
        })
            .then(jsonData => jsonData.json())
            .then(fetchTodos => {
                dispatch(todosFetchDataSuccess(fetchTodos))
            })
            .catch(error => console.log('Error', error))
    }
}
