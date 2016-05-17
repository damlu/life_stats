export const ADD_FACTOR = "ADD_FACTOR";

export function addFactor(text) {
    return () => {
        Meteor.call('addFactor', text);
    };
}