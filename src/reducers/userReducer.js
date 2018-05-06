import update from 'react-addons-update';
import {USER} from "../constants/constants";

const initialState = {
    user: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case USER.LOGIN:
            return update(state, {$set: action.payload});
        case USER.LOGOUT:
            return update(state, {$set: action.payload});
        default:
            return state;
    }

    return state;
}