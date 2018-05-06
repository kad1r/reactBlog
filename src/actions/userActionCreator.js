import * as firebase from 'firebase';
import {USER} from "../constants/constants";

export function login(id = null, password = null,userAuthInfo = null) {
    return function (dispatch) {
        let user = {};

            return firebase.auth().signInWithEmailAndPassword(id, password).then((userInfo)=>{
                user.displayName = userInfo.displayName;
                user.email = userInfo.email;
                user.emailVerified = userInfo.emailVerified;
                user.photoURL = userInfo.photoURL;
                user.isAnonymous = userInfo.isAnonymous;
                user.uid = userInfo.uid;

                return dispatch({
                    type: USER.LOGIN,
                    payload: user
                })
            });
    }
}

export function logout() {
    return function (dispatch) {
        localStorage.removeItem('userState');
        firebase.auth().signOut();

        return dispatch({
            type: USER.LOGOUT,
            payload: null
        })
    }
}