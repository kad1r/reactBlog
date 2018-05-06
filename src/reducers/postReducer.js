import update from 'react-addons-update';
import {POST, USER} from "../constants/constants";

const initialState = {
    tags: [],
    counter: 0,
    categories: {},
    selectedCategory:''
};

export default function (state = initialState, action) {
    switch (action.type) {
        case POST.TAG.ADD: {
            let newValue = action.payload;
            return update(state, {tags: {$push: [newValue]}});
        }
        case POST.TAG.REMOVE: {
            return update(state, {tags: {$apply: (val)=>{
                        return val.filter((v) => v.id !== action.payload.id)
                    }}});
        }
        case POST.TAG.INCREASE:
            return update(state, {counter: {$set: (state.counter || 0) + 1}});
        case POST.LOAD_DATA:
            return update(state, {categories: {$set: action.payload}});
        case POST.SELECT_CATEGORY:
            return update(state, {selectedCategory: {$set: action.payload}});
        case POST.REMOVE_DATA: {
            return update(state,
                {tags:{$set:[]}},
                {counter:{$set:0}},
                {categories:{$set:{}}},
                {selectedCategory:{$set:''}}
                )
        }
        case POST.ADD_CATEGORY:
            return update(state, {$set: action.payload});
        case POST.REMOVE_CATEGORY:
            return update(state, {
                tags: {
                    $apply: (val) => {
                        return val.filter((v) => v !== action.payload)
                    }
                }
            });
        default:
            return state;
    }

    return state;
}