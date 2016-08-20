import { Meteor } from 'meteor/meteor';
import Factors from '../imports/collection';
import * as utils from './utils';
import * as errors from './errors';

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
        if (utils.isValidDate(dateTime)) {
            const log = {_id: new Meteor.Collection.ObjectID().valueOf(), value, dateTime};
            result = Factors.update({"_id": factor._id}, {$set: {logs: [...factor.logs, log]}});

            return result;
        } else {
            throw new Meteor.Error(...errors.InvalidLogDate);
        }
    },
    removeLog({factor, log}) {
        //console.log([{"_id":factor._id}, {$pull: {logs:{"_id": log._id}}}]);
        result = Factors.update({"_id":factor._id}, {$pull: {logs:{"_id": log._id}}});
        return result;
    }
});