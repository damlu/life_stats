import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import FactorList from './FactorList';


const FactorApp = () => {
    return (
        <div>
            <Menu />
            <Data />
            <Modals />
        </div>
    );
};

export default FactorApp;


const Menu = () => {
    return (
        <div className="main-menu bg-grey">
            {/*<DatePicker />*/}
            <FactorList />

        </div>
    );
};

const Data = () => {
    return (
        <div className="content">
            <h1>No data yet</h1>
        </div>
    );
};
const Modals = () => {
    return (
        <div>
        </div>
    );
};