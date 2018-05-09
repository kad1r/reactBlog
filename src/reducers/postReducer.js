import update from 'react-addons-update';
import {POST, USER} from "../constants/constants";

const initialState = {
    tags: [],
    counter: 0,
    categories: {},
    selectedCategory: '',
    posts: [],
    title: '',
    state: 0,
    content: '',
    editPost:{}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case POST.ADD_POST: {
            return update(state, {posts: {$push: [action.payload]}});
        }
        case POST.TAG.ADD: {
            let newValue = action.payload;
            return update(state, {tags: {$push: [newValue]}});
        }
        case POST.TAG.REMOVE: {
            return update(state, {
                tags: {
                    $apply: (val) => {
                        return val.filter((v) => v.id !== action.payload.id)
                    }
                }
            });
        }
        case POST.TAG.INCREASE:
            return update(state, {counter: {$set: (state.counter || 0) + 1}});
        case POST.LOAD_DATA:
            return update(state, {categories: {$set: action.payload}});
        case POST.SELECT_CATEGORY:
            return update(state, {selectedCategory: {$set: action.payload}});
        case POST.REMOVE_DATA: {
            return update(state,
                {tags: {$set: []}},
                {counter: {$set: 0}},
                {categories: {$set: {}}},
                {selectedCategory: {$set: ''}},
                {title: ''},
                {state: 1},
                {content: ''}
            )
        }
        case POST.ADD_CATEGORY:
            return update(state, {category: {$set: action.payload}});
        case POST.REMOVE_CATEGORY:
            return update(state, {
                tags: {
                    $apply: (val) => {
                        console.log('val', val);
                        return val.filter((v) => v !== action.payload)
                    }
                }
            });
        case POST.GET_ALL_POST:
            return update(state, {posts: {$set: action.payload}});
        case POST.SET_TITLE:
            return update(state, {title: {$set: action.payload}});
        case POST.SET_STATE:
            return update(state, {state: {$set: action.payload}});
        case POST.SET_CONTENT:
            return update(state, {content: {$set: action.payload}});
        case POST.SELECTED_MODE:
            return update(state, {mode: {$set: action.payload}});
        case POST.SET_OLD_POST:
            console.log('receive reducers',action.payload)
            return update(state,
                {editPost: {$set: action.payload}}
            );
        default:
            return state;
    }

    return state;
}