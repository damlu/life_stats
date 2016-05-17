import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import FactorList from './FactorList';
import AddFactor from './AddFactor';


const FactorApp = () => {
    return (
        <div className="container">
            <div className="row">
                <Menu />
                <Data />
            </div>
            <Modals />
        </div>
    );
};

export default FactorApp;


const Menu = () => {
    return (
        <div className="main-menu col-sm-3 bg-grey">
            {/*<DatePicker />*/}
            <FactorList />

        </div>
    );
};

const Data = () => {
    return (
        <div className="col-sm-8">
            <h1>No data yet</h1>
        </div>
    );
};
const Modals = () => {
    return (
        <div>
            <AddFactor />
        </div>
    );
};