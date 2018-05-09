import * as firebase from 'firebase';
import {POST} from "../constants/constants";

export function selectPostMode(mode) {
    return function (dispatch) {
        return dispatch({
            type: POST.SELECTED_MODE,
            payload: mode
        })
    }
}

export function addPost(post) {

    return function (dispatch) {
        let userId = firebase.auth().currentUser.uid;

        let postKey = firebase.database().ref(userId + '/posts').push().key;
        post["key"] = postKey;
        firebase.database().ref(userId + '/posts/' + postKey).update(post);

        //TODO: last change tutup ona göre postu yenilemek yada listener tanımlamak lazım.

        return dispatch({
            type: POST.ADD_POST,
            payload: post
        })
    }
}

export function updatePost(post) {
    return function (dispatch) {
        let userId = firebase.auth().currentUser.uid;
        console.log(post)
        firebase.database().ref(userId + '/posts/'+post.key).update(post);

        return dispatch({
            type: 'BOOK_SELECTED',
            payload: ''
        })
    }
}

export function setEditPost(post) {
    return function (dispatch) {
        return dispatch({
            type: POST.SET_OLD_POST,
            payload: post
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
        console.log('remove tag')
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

//CATEGORY DATA
//TODO: isim değişmeli
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
            type: POST.SET_OLD_POST,
            payload: category
        })
    }
}

export function setPostTitle(title) {
    return function (dispatch) {
        return dispatch({
            type: POST.SET_TITLE,
            payload: title
        })
    }
}

export function setPostState(state) {
    return function (dispatch) {
        return dispatch({
            type: POST.SET_STATE,
            payload: state
        })
    }
}

export function setPostContent(content) {
    return function (dispatch) {
        return dispatch({
            type: POST.SET_CONTENT,
            payload: content
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

export function getPost(postId,userId) {
    return function (dispatch) {
        let post = null;
        return firebase.database().ref(userId + '/posts' + postId).once('value').then((snapshot) => {
            post = snapshot.val();

            return dispatch({
                type: POST.GET_POST,
                payload: post
            })
        }).catch((err) => {
            throw err;
        });
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