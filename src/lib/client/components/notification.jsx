import React, { PropTypes } from 'react';
import cn from 'classnames';
import { connect } from 'react-redux';
import { notifDismiss } from 'redux-notifications/lib/actions';

function Notif(props) {
  const {
    componentClassName,
    id,
    message,
    kind,
    dismiss,
  } = props;
  return (
    <div className={cn(componentClassName, `${componentClassName}--${kind}`, `${componentClassName}--${id}`)}>
      <div className={`${componentClassName}__message`}>
        {message}
      </div>
      <button
        onClick={() => dismiss(id)}
        type="button"
        className={`${componentClassName}__close`}
        aria-label="Close"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );
}

Notif.propTypes = {
  componentClassName: PropTypes.string,
  id: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number,
  ]).isRequired,
  message: PropTypes.string.isRequired,
  kind: PropTypes.string,
  dismiss: PropTypes.func,
};

const mapDispatchToProps = dispatch => ({
  dismiss: id => dispatch(notifDismiss(id)),
});

export default connect(null, mapDispatchToProps)(Notif);
