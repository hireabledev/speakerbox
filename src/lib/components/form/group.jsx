import React, { Component, PropTypes } from 'react';

export default class FormGroup extends Component {
  getChildContext() { // eslint-disable-line class-methods-use-this
    return {
      formGroupId: new Date().getTime().toString() + Math.floor(Math.random() * 1000),
    };
  }

  render() {
    return (
      <div className="form-group">
        {this.props.children}
      </div>
    );
  }
}

FormGroup.propTypes = {
  children: PropTypes.node.isRequired,
};

FormGroup.childContextTypes = {
  formGroupId: PropTypes.string,
};
