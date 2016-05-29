import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createContainer } from 'meteor/react-meteor-data';
import Factors from '../../collection';
import DatePicker from './DatePicker';
import AddFactor from './AddFactor';
import { displayFactor, addLog } from '../actions/actions';
import {DateTime} from 'react-bootstrap-datetime';

class FactorList extends React.Component {

    render() {
        const {dispatch, factors, dispatchDisplayFactor, dispatchAddLog} = this.props;

        return (

            <div className="panel-group" id="factor-list" role="tablist" aria-multiselectable="true">

                {factors.map((factor, i) => {
                    return (<FactorItem factor={factor} key={factor._id} dispatchDisplayFactor={dispatchDisplayFactor} dispatchAddLog={dispatchAddLog}/>);

                })}

                <AddFactor />
                <div className="hide">
                </div>
            </div>
        )
    }
}

class FactorItem extends React.Component {

    componentDidMount() {
        $(this.refs.panel).on('show.bs.collapse', this.onExpand);
       // $(this.refs.datepicker).datetimepicker();
    }

    onExpand(e) {
        //$('#datepicker-div').detach().appendTo($(e.delegateTarget).find('.datepicker-container'));
    }

    onDisplayClick(e) {
        e.stopPropagation();
        e.preventDefault();
        const {factor, dispatchDisplayFactor} = this.props;
        let data = {};
        data[factor._id] = true;
        dispatchDisplayFactor(data);
    }

    onLogClick(value) {
        const {factor, dispatchAddLog} = this.props;
        //const dateTime = $(this.refs.datepicker).datepicker('getDate');
        const dateTime = $(this.refs.datetime).getValue;
        dispatchAddLog({factor, dateTime, value});
    }

    render() {
        const {dispatch, factor, dispatchAddLog} = this.props;

        return (
            <div className="panel" ref="panel">
                <div className="panel-heading clickable inline-block" role="tab" id={"heading-" + factor._id} data-toggle="collapse" data-target={"#collapse-" + factor._id} aria-expanded="false" data-parent="#factor-list" aria-controls={"collapse-" + factor._id}>
                    <h4 className="panel-title">{factor.name}</h4>
                </div>
                <div className="display-button" onClick={this.onDisplayClick.bind(this)}>
                    <span className="glyphicon glyphicon-indent-left" aria-hidden="true"></span>
                </div>
                <div id={"collapse-" + factor._id} className="panel-collapse collapse" role="tabpanel" aria-labelledby={"heading-" + factor._id}>
                    <div className="panel-body">
                        <div className="position-relative input-group datepicker-container">
                            {/* <span className="input-group-addon">Date</span>
                            <input type="text" className="form-control datepicker-input" ref="datepicker"/> */}
                            <DateTime ref="datetime"/>
                        </div>
                        <ValueInput onClick={this.onLogClick.bind(this)} type={factor.type}/>
                    </div>
                </div>
            </div>
        )
    }
}

class ValueInput extends React.Component {

    onLogClick() {
        const {onClick} = this.props;
        const inputNode = this.refs.input;
        onClick(inputNode.value)
    }

    render() {
        let result;
        const {type, onClick} = this.props;

        switch (type) {
            case 'SCALE':
            case 'INT':
            case 'FLOAT':
                result = (
                    <div className="input-group">
                        <input type="number" className="form-control" ref="input"/>
                    <span className="input-group-btn">
                        <button className="btn btn-secondary" type="button"
                                onClick={this.onLogClick.bind(this)}>Log It</button>
                    </span>
                    </div>
                );
                break;
            case 'BOOLEAN':
                result = (
                    <div className="input-group">
                        <select className="form-control" ref="input">
                            <option value="1">Yes</option>
                            <option value="0">No</option>
                        </select>
                    <span className="input-group-btn">
                        <button className="btn btn-secondary" type="button"
                                onClick={this.onLogClick.bind(this)}>Log It</button>
                    </span>
                    </div>
                );
                break;
            default:
                break;
        }

        return result;
    }
}



FactorList.propTypes = {
    factors: PropTypes.array.isRequired
};

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchDisplayFactor: (factor) => {
            dispatch(displayFactor(factor))
        },
        dispatchAddLog: (data) => {
            dispatch(addLog(data))
        }
    }
}


const FactorContainer = createContainer(() => {
   const factorSub = Meteor.subscribe('getFactors');
   // console.log(Factors.find({}).fetch());
    return {
        factors: Factors.find({}).fetch() || []
    }
}, FactorList);

export default connect(mapStateToProps, mapDispatchToProps)(FactorContainer);