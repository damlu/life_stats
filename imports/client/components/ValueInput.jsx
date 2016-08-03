import React, { PropTypes } from 'react';

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
                        <input type="number" className="form-control" ref="input" defaultValue="0"/>
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
                            <option value="1" selected="selected">Yes</option>
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



ValueInput.propTypes = {
    type: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
};

export default ValueInput;