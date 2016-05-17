import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { addFactor } from '../actions/actions';
import serialize from 'form-serialize';
import { factorTypes } from '../../collection';

const AddFactor = ({dispatch}) => {

    const onSubmit = (e) => {
        e.preventDefault();
        const formData = serialize(document.querySelector('#add-factor-form'), {hash:true});
        dispatch(addFactor(formData));
    }

    return (
        <div id="add-factor-modal" className="modal fade" style={{display: "none"}}>
            <form className="modal-content" id="add-factor-form" name="add-factor-form" role="form" onSubmit={onSubmit}>
                <div className="modal-header">
                    <a className="close" data-dismiss="modal">×</a>
                    <h3>Add a Factor</h3>
                </div>
                <div className="modal-body">
                    <div class="form-group">
                        <label for="name">Factor Name</label>
                        <input type="text" name="name" className="form-control" />
                    </div>
                    <div class="form-group">
                        <label for="type">Type</label>
                        <select name="type" className="form-control">
                            {factorTypes.map((type) => {
                                return <option value={type.key} key={type.key}>{type.name}</option>
                            })}
                        </select>
                    </div>
                </div>
                <div className="modal-footer">
                    <input className="btn btn-success" type="submit" value="Create" id="add-factor-form-submit" />
                    <a href="#" className="btn" data-dismiss="modal">Cancel</a>
                </div>
            </form>
        </div>

    )
};





AddFactor.propTypes = {
    factors: PropTypes.array.isRequired
};

const mapStateToProps = (state) => {
    return {
        factors: state.factors
    };
};

export default connect(mapStateToProps)(AddFactor);