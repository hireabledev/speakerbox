import React, { PropTypes } from 'react';
import cn from 'classnames';

export default function Label({ srOnly, ...labelProps }, context) {
  return (
    <label
      {...labelProps}
      className={cn(labelProps.className, {
        'sr-only': srOnly,
      })}
      htmlFor={encodeURIComponent(labelProps.htmlFor + context.formGroupId)}
    />
  );
}

Label.propTypes = {
  htmlFor: PropTypes.string,
  className: PropTypes.string,
  srOnly: PropTypes.bool,
};

Label.contextTypes = {
  formGroupId: PropTypes.string,
};
