import * as firebase from 'firebase';
import {POST} from "../constants/constants";

export function addPost(post) {
    return function (dispatch) {
        let userId = firebase.auth().currentUser.uid;
        firebase.database().ref(userId + '/posts').push(post);
        return dispatch({
            type: 'BOOK_SELECTED',
            payload: ''
        })
    }
}

export function addTag(tag) {
    return function (dispatch) {
        return dispatch({
            type: POST.TAG.ADD,
            payload: tag
        })
    }
}
export function removeTag(tag) {
    return function (dispatch) {

        return dispatch({
            type: POST.TAG.REMOVE,
            payload: tag
        })
    }
}

export function increaseTagCount() {
    return function (dispatch) {

        return dispatch({
            type: POST.TAG.INCREASE,
            payload: null
        })
    }
}
export function loadPostData(userId) {
    return function (dispatch) {
        firebase.database().ref(userId + '/cateogries').once('value').then((snapshot)=>{
           let categories = snapshot.val();

            return dispatch({
                type: POST.LOAD_DATA,
                payload: categories
            })
        });
    }
}

export function selectCategory(category) {
    return function (dispatch) {
        return dispatch({
            type: POST.SELECT_CATEGORY,
            payload: category
        })
    }
}

export function removePostData() {
    return function (dispatch) {
        return dispatch({
            type: POST.REMOVE_DATA,
            payload: null
        })
    }
}

export function addCategory(category) {
    return function (dispatch) {
        return dispatch({
            type: POST.ADD_CATEGORY,
            payload: category
        })
    }
}

export function removeCategory(category) {
    return function (dispatch) {
        return dispatch({
            type: POST.REMOVE_CATEGORY,
            payload: category
        })
    }
}

