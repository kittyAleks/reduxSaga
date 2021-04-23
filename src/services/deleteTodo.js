import {removeTodo} from "../store/action/todosActions";

export const deleteTodo = async (dispatch, id) => {
    try {
        const response = await fetch(`https://6079a056460a6600174fc133.mockapi.io/api/v1/todos/${id}`, {
            method: 'DELETE',
        })
        const responseBody = await response.json();
        dispatch(removeTodo(responseBody))

    } catch (requestError) {
        console.log('requestError', requestError)
    }
}
