import * as types from './types';

export function addFactor(text) {
    return () => {
        Meteor.call('addFactor', text);
    };
}

export function addLog(data) {
    return () => {
        Meteor.call('addLog', data);
    };
}

export function toggleFactor(id) {
    return {
        type: types.TOGGLE_FACTOR,
        id
    };
}
