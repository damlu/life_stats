import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

export default class DatePicker extends Component {

    componentDidMount() {
        //$('#datepicker-input').datetimepicker();
    }

    render() {
        return (
            <div className="position-relative input-group" id="datepicker-div">
                <span className="input-group-addon">Date</span>
                <input type="text" className="form-control" id="datepicker-input" />
            </div>
        );
    }
}


/*
AddFactor.propTypes = {
    factors: PropTypes.array.isRequired
};


const mapStateToProps = (state) => {
    return {
        factors: state.factors
    };
};
*/

