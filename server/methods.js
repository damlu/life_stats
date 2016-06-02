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
    addLog({factor, value, dateTime}) {
        console.log(dateTime);
        const log = {_id: new Meteor.Collection.ObjectID().valueOf(), value, dateTime};
        result = Factors.update(factor._id, {$set: {logs:[...factor.logs, log]}});

        return result;
    }
});