import * as types from '../actions/types';
//import * as actions from '../actions/actions';

const initialState = {factors:[], factorDisplayList:{}};

const rootReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case types.TOGGLE_FACTOR:
            let new_state = Object.assign({}, state);
            new_state.factorDisplayList =  factor(new_state.factorDisplayList, action);
            return new_state;
        default:
            return state;
    }
};

const factor = (state = {}, action = {}) => {
    switch (action.type) {
        case types.TOGGLE_FACTOR:
            if (state[action.id]) {
                let new_state = Object.assign({}, state);
                delete new_state[action.id];
                return new_state;
            }
            let idObj = {};
            idObj[action.id] = true;
            return Object.assign({}, state, idObj);
        default:
            return state;
    }
};

export default rootReducer;

