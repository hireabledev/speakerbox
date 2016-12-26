import React, { PropTypes } from 'react';

export default function Label(props, context) {
  return (
    <label
      id={props.htmlFor + context.formGroupId}
      htmlFor={props.htmlFor}
      {...props}
    />
  );
}

Label.propTypes = {
  htmlFor: PropTypes.string,
};

Label.contextTypes = {
  formGroupId: PropTypes.string,
};
