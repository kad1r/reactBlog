import * as firebase from 'firebase';
import {POST} from "../constants/constants";

export function addPost(post) {
    return function (dispatch) {
        let userId = firebase.auth().currentUser.uid;
        firebase.database().ref(userId + '/posts').push(post);
        //TODO: key'i içine gömmek lazım
        //TODO: last change tutup ona göre postu yenilemek yada listener tanımlamak lazım.

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
        firebase.database().ref(userId + '/categories/').on("value", function (snapshot) {
            let arrayCategories = [];

            if(snapshot.val()){
                let categories = snapshot.val();

                Object.keys(categories).map((key)=> {
                    console.log(key)
                    arrayCategories.push(key);
                });
            }

            return dispatch({
                type: POST.LOAD_DATA,
                payload: arrayCategories
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

export function addCategory(category,userId) {
    return function (dispatch) {

        firebase.database().ref(userId + '/categories/').update({[category]:true});
        return dispatch({
            type: POST.ADD_CATEGORY,
            payload: category
        })
    }
}

export function removeCategory(category,userId) {
    return function (dispatch) {
        firebase.database().ref(userId + '/categories/').update({[category]:null});
        return dispatch({
            type: POST.REMOVE_CATEGORY,
            payload: category
        })
    }
}

export function getAllPost(userId) {
    return function (dispatch) {
        let posts = [];
        return firebase.database().ref(userId + '/posts').once('value').then((snapshot) => {
            posts = snapshot.val();
            let arrayPosts = [];

            Object.keys(posts).map((key)=> {
                arrayPosts.push(posts[key]);
            });

            return dispatch({
                type: POST.GET_ALL_POST,
                payload: arrayPosts
            })
        }).catch((err) => {
            throw err;
        });


    }
}