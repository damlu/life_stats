import * as actions from '../actions/actions';

const initialState = {factors:[]};

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
       // case actions.ADD_FACTOR:
       //     return Object.assign({}, state, {factors:[...state.factors, action.text]});
        default:
            return state;
    }
}

