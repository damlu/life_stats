import React, { PropTypes } from 'react';
import Log from './Log'

class LogList extends React.Component {

    render() {
        const {factor, date, dispatchRemoveLog} = this.props;
        const logsByDate = factor.logs.filter((log)=>{return date.isSame(log.dateTime, 'day');});

        if (logsByDate.length > 0) {
            return (
                <ul className="list-group">
                    {logsByDate.map((log, i) => {
                        return (<Log factor={factor} log={log} key={log._id} dispatchRemoveLog={dispatchRemoveLog} />);
                    })}
                </ul>
            )
        }
        return null;
    }
}

LogList.propTypes = {
    factor: PropTypes.object.isRequired,
    date: PropTypes.object.isRequired,
    dispatchRemoveLog: PropTypes.func.isRequired
};

export default LogList;