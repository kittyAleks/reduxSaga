import {updateTodoColor, updateTodoText} from "../store/action/todosActions";

export const changeTodoColor = (color, selectedItem) => {
    return async dispatch => {
        await fetch(`https://6079a056460a6600174fc133.mockapi.io/api/v1/todos/${selectedItem}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({color})
        })
            .then(response => response.json())
            .then(updatedTodo => {
                dispatch(updateTodoColor(updatedTodo))
            })
    }
}
