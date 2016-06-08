import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import FactorList from './FactorList';
import LineGraph from './LineGraph';
import Graph from './Graph';


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
            <Graph />
        </div>
    );
};

const Modals = () => {
    return (
        <div>
        </div>
    );
};