import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createContainer } from 'meteor/react-meteor-data';
import Factors from '../../collection';
import AddFactor from './AddFactor';
import FactorItem from './FactorItem';
import { toggleFactor, addLog, removeLog } from '../actions/actions';


class FactorList extends React.Component {

    render() {
        const {dispatch, factors, factorDisplayList, dispatchToggleFactor, dispatchAddLog, dispatchRemoveLog} = this.props;

        return (

            <div className="panel-group" id="factor-list" role="tablist" aria-multiselectable="true">

                {factors.map((factor, i) => {
                    return (<FactorItem factor={factor}
                                        displayed={Boolean(factorDisplayList[factor._id])}
                                        key={factor._id}
                                        dispatchToggleFactor={dispatchToggleFactor}
                                        dispatchAddLog={dispatchAddLog}
                                        dispatchRemoveLog={dispatchRemoveLog} />);

                })}

                <AddFactor />
                <div className="hide">
                </div>
            </div>
        )
    }
}


FactorList.propTypes = {
    factors: PropTypes.array.isRequired,
    factorDisplayList: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        factorDisplayList: state.factorDisplayList
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchToggleFactor: (factor) => {
            dispatch(toggleFactor(factor))
        },
        dispatchAddLog: (data) => {
            dispatch(addLog(data))
        },
        dispatchRemoveLog: (data) => {
            dispatch(removeLog(data))
        }
    }
};


const FactorContainer = createContainer(() => {
   const factorSub = Meteor.subscribe('getFactors');
   // console.log(Factors.find({}).fetch());
    return {
        factors: Factors.find({}).fetch() || []
    }
}, FactorList);

export default connect(mapStateToProps, mapDispatchToProps)(FactorContainer);