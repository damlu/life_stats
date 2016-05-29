export const ADD_FACTOR = "ADD_FACTOR";
export const ADD_LOG = "ADD_LOG";
export const DISPLAY_FACTOR = "DISPLAY_FACTOR";


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

export function displayFactor(data) {
    return {
        type: DISPLAY_FACTOR,
        data
    };
}