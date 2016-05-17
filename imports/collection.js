const Factors = new Mongo.Collection('factors');

export default Factors;

export const factorTypes = [
    {name: 'Scale', key: 'SCALE'},
    {name: 'Integer', key: 'INT'},
    {name: 'Number', key: 'FLOAT'},
    {name: 'Boolean', key: 'BOOL'}
];