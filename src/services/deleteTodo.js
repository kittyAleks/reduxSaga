import {addTodo, removeTodo} from "../store/action/todosActions";

// export const deleteTodo = async (dispatch, selectedItem) => {
//     console.log('QQQ_selectedItem_QQQ_selectedItem', selectedItem)
//     try {
//         const response = await fetch(`https://6079a056460a6600174fc133.mockapi.io/api/v1/todos/${selectedItem}`, {
//             method: 'DELETE',
//         })
//         const responseBody = await response.json();
//         dispatch(removeTodo(responseBody))
//
//     } catch (requestError) {
//         console.log('requestError', requestError)
//     }
// }

export const deleteTodo = (selectedItem) => {
    return async dispatch => {
        await fetch(`https://6079a056460a6600174fc133.mockapi.io/api/v1/todos/${selectedItem}`, {
            method: 'DELETE',
            body: JSON.stringify(selectedItem)
        })
            .then(response => response.json())
            .then(removedTodo => {
                dispatch(removeTodo(removedTodo))
            })
            .catch(error => console.log('Error', error))
    }
}
