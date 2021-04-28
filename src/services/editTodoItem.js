import {updateTodoText} from "../store/action/todosActions";

export const editTodoItem = (updateItem) => {
    const {id, ...fieldsToUpdate} = updateItem;
    return async dispatch => {
        await fetch(`https://6079a056460a6600174fc133.mockapi.io/api/v1/todos/${id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(fieldsToUpdate)
        })
            .then(response => response.json())
            .then(updateTodo => dispatch(updateTodoText(updateTodo)))
            .catch(error => console.log('Error', error))
    }
}
