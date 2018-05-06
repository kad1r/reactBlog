export function selectBook(book) {
    return function (dispatch) {
        return dispatch({
            type: 'BOOK_SELECTED',
            payload: book
        })
    }
}