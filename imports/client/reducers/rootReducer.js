import * as actions from '../actions/actions';

const initialState = {factors:[], factorDisplayList:{}};

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case actions.DISPLAY_FACTOR:
            return Object.assign({}, state, {factorDisplayList:Object.assign({}, state.factorDisplayList, action.data)});
        default:
            return state;
    }
}

