import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createContainer } from 'meteor/react-meteor-data';
import Factors from '../../collection';
import DatePicker from './DatePicker';
import AddFactor from './AddFactor';

class FactorList extends React.Component {

    render() {
        const {dispatch} = this.props;
        const factors = this.props.factors;

        return (

            <div className="panel-group" id="factor-list" role="tablist" aria-multiselectable="true">

                {factors.map((factor, i) => {
                    return (<FactorItem factor={factor} key={factor._id} />);
                })}

                <AddFactor />
                <div className="hide">
                    <DatePicker />
                </div>
            </div>
        )
    }
}

class FactorItem extends React.Component {

    componentDidMount() {
        $(this.refs.panel).on('show.bs.collapse', this.onExpand);
    }

    onExpand(e) {
        console.log('wtf');
        $('#datepicker-div').detach().appendTo($(e.delegateTarget).find('.panel-body'));
    }

    render() {
        const factor = this.props.factor;

        return (
            <div className="panel" ref="panel">
                <div className="panel-heading clickable" role="tab" id={"heading-" + factor._id} data-toggle="collapse" data-target={"#collapse-" + factor._id} aria-expanded="false" data-parent="#factor-list" aria-controls={"collapse-" + factor._id}>
                    <h4 className="panel-title">{factor.name}</h4>
                </div>
                <div id={"collapse-" + factor._id} className="panel-collapse collapse" role="tabpanel" aria-labelledby={"heading-" + factor._id}>
                    <div className="panel-body">

                    </div>
                </div>
            </div>
        )
    }
}



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