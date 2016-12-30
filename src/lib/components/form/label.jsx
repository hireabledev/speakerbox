import React, { PropTypes } from 'react';

export default function Label(props, context) {
  return (
    <label
      {...props}
      htmlFor={encodeURIComponent(props.htmlFor + context.formGroupId)}
    />
  );
}

Label.propTypes = {
  htmlFor: PropTypes.string,
};

Label.contextTypes = {
  formGroupId: PropTypes.string,
};
