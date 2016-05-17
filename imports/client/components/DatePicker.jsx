import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

export default class DatePicker extends Component {

    componentDidMount() {
        $('#my-datepicker').datetimepicker();
    }

    render() {
        return (
            <div className="position-relative">
                <input type="text" className="form-control " id="my-datepicker" />
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

