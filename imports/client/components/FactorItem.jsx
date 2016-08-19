import React, { PropTypes } from 'react';
import LogList from './LogList';
import ValueInput from './ValueInput';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


class FactorItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: moment()
        };
    }

    handleDateChange(date) {
        console.log(date);
        this.setState({
            date
        });
    }

    componentDidMount() {
        $(this.refs.panel).on('show.bs.collapse', this.onExpand);
        // $(this.refs.datepicker).datetimepicker();
    }

    onExpand(e) {
        //$('#datepicker-div').detach().appendTo($(e.delegateTarget).find('.datepicker-container'));
    }

    onToggleClick(e) {
        e.stopPropagation();
        e.preventDefault();
        const {factor, dispatchToggleFactor} = this.props;
        dispatchToggleFactor(factor._id);
    }

    onLogClick(value) {
        const {factor, dispatchAddLog} = this.props;
        const dateTime = this.state.date.toDate();
        //console.log(dateTime);
        dispatchAddLog({factor, dateTime, value});
    }

    render() {
        const {factor, displayed, dispatchRemoveLog} = this.props;

        const toggleButtonClass = "toggle-button " + (displayed ? "text-danger" : "text-success");
        const toggleIconClass = "glyphicon " + (displayed ? "glyphicon-indent-right" : "glyphicon-indent-left");
        const highlightDates = factor.logs.map((log)=>{return moment(log.dateTime);});

        return (
            <div className="panel" ref="panel">
                <div className="panel-heading clickable inline-block" role="tab" id={"heading-" + factor._id} data-toggle="collapse" data-target={"#collapse-" + factor._id} aria-expanded="false" data-parent="#factor-list" aria-controls={"collapse-" + factor._id}>
                    <h4 className="panel-title">{factor.name}</h4>
                </div>
                <div className={toggleButtonClass} onClick={this.onToggleClick.bind(this)}>
                    <span className={toggleIconClass} aria-hidden="true"></span>
                </div>
                <div id={"collapse-" + factor._id} className="panel-collapse collapse" role="tabpanel" aria-labelledby={"heading-" + factor._id}>
                    <div className="panel-body">

                        <LogList factor={factor} date={this.state.date} dispatchRemoveLog={dispatchRemoveLog} />

                        <div className="position-relative input-group datepicker-container">
                            <DatePicker selected={this.state.date}
                                        onChange={this.handleDateChange.bind(this)}
                                        highlightDates={highlightDates} />
                        </div>

                        <ValueInput onClick={this.onLogClick.bind(this)} type={factor.type}/>

                    </div>
                </div>
            </div>
        )
    }
}




FactorItem.propTypes = {
    factor: PropTypes.object.isRequired,
    displayed: PropTypes.bool.isRequired,
    dispatchToggleFactor: PropTypes.func.isRequired,
    dispatchAddLog: PropTypes.func.isRequired,
    dispatchRemoveLog: PropTypes.func.isRequired
};

export default FactorItem;