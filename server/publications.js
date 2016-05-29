import Factors from '../imports/collection';



const factorPubFields = {
    name: 1,
    type: 1,
    logs: 1
};


const getFactorPublication = function () {
    let query = {};

    return Factors.find(query, {fields: factorPubFields});
};


Meteor.publish('getFactors', getFactorPublication);
