import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createContainer } from 'meteor/react-meteor-data';
import Factors from '../../collection';
import AddFactor from './AddFactor';

class FactorList extends React.Component {
    render() {
        const {dispatch} = this.props;
        const factors = this.props.factors;
        console.log(factors);
        return (
            <div className="list-group">
                {factors.map((factor) => {
                    return <button type="button"
                                   key={factor._id}
                                   className="list-group-item">{factor.name}</button>;
                })}
                {/*<button type="button"
                        className="list-group-item list-group-item-success"
                        onClick = {() => {
                    dispatch(addFactor(input.value));
                    input.value = '';
                }}>
                    Add a factor
                </button>*/}
                <button type="button" data-toggle="modal" data-target="#add-factor-modal" className="list-group-item list-group-item-success">Add a Factor</button>


            </div>
        )
    }
};


FactorList.propTypes = {
    factors: PropTypes.array.isRequired
};

const mapStateToProps = (state) => {
    return {
        factors: state.factors
    };
};

const FactorContainer = createContainer(() => {
   const factorSub = Meteor.subscribe('getFactors');
   // console.log(Factors.find({}).fetch());
    return {
       // factorSubReady: factorSub.ready(),
        factors: Factors.find({}).fetch() || []
    }
}, FactorList);

export default connect(mapStateToProps)(FactorContainer);