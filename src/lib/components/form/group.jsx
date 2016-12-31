import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getFormSyncErrors, isPristine } from 'redux-form';
import cn from 'classnames';

function FormGroupInner(props) {
  const error = props.syncErrors[props.name];
  return (
    <div
      className={cn('form-group', {
        'has-danger': error,
      })}
    >
      {props.children}
    </div>
  );
}

FormGroupInner.propTypes = {
  children: PropTypes.node.isRequired,
  name: PropTypes.string,
  syncErrors: PropTypes.object,
};

FormGroupInner.defaultProps = {
  syncErrors: {},
};

const mapStateToProps = (state, ownProps) => ({
  syncErrors: getFormSyncErrors(ownProps.formName)(state),
  pristine: isPristine(ownProps.formName)(state),
});

const FormGroupInnerContainer = connect(mapStateToProps)(FormGroupInner);

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
      <FormGroupInnerContainer {...this.props} formName={this.context._reduxForm.form} /> // eslint-disable-line no-underscore-dangle, max-len
    );
  }
}

FormGroup.propTypes = {
  // children: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
};

FormGroup.contextTypes = {
  _reduxForm: PropTypes.shape({
    form: PropTypes.string,
  }),
};

FormGroup.childContextTypes = {
  formGroupId: PropTypes.string,
  formGroupName: PropTypes.string,
};
