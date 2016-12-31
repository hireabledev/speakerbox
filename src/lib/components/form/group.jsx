import React, { Component, PropTypes } from 'react';

export default class FormGroup extends Component {
  getChildContext() {
    return {
      formGroupId: encodeURIComponent(
        this.props.name + new Date().getTime().toString() + Math.floor(Math.random() * 1000)
      ),
      formGroupName: this.props.name,
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
  name: PropTypes.string.isRequired,
};

FormGroup.childContextTypes = {
  formGroupId: PropTypes.string,
  formGroupName: PropTypes.string,
};
