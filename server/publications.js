import Factors from '../imports/collection';



const factorPubFields = {
    name: 1,
    type: 1
};


const getFactorPublication = function (filter = '') {
    let query = {};

    switch (filter) {
       /* case 'SHOW_COMPLETED':
            query.completed = true;
            break;
        case 'SHOW_ACTIVE':
            query.completed = false;
            break;*/
        default:
            break;
    }
    //Counts.publish(this, 'TodoCount', Todos.find(query));
    return Factors.find(query, {fields: factorPubFields});
};


Meteor.publish('getFactors', getFactorPublication);
