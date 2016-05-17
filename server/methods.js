import Factors from '../imports/collection';
let result;
Meteor.methods({
    addFactor({name, type}) {
        result = Factors.insert({
            name,
            type,
            logs: []
        });

        return result;
    },
    addLog(factor, value, date_time = new Date()) {
        const log = {value, date_time};
        result = Factors.update(factor._id, {$set: {logs:[...factor.logs, log]}});

        return result;
    }
});