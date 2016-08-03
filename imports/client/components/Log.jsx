import React, { PropTypes } from 'react';

class Log extends React.Component {

    onRemoveClick() {
        const {factor, log, dispatchRemoveLog} = this.props;
        console.log(factor, log);
        dispatchRemoveLog({factor, log});
    }

    render() {
        const {log} = this.props;

        return (
            <li className="list-group-item">
                {log.dateTime.toLocaleString()}
                <span className="pull-right">
                    <button onClick={this.onRemoveClick.bind(this)} type="button" className="btn btn-xs btn-danger" aria-label="Remove">
                        <span className="glyphicon glyphicon-trash" aria-hidden="true"></span>
                    </button>
                </span>
            </li>
        )
    }
}



Log.propTypes = {
    factor: PropTypes.object.isRequired,
    log: PropTypes.object.isRequired,
    dispatchRemoveLog: PropTypes.func.isRequired
};

export default Log;