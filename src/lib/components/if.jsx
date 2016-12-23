import { PropTypes } from 'react';

export default function If(props) {
  if (props.truthy) {
    return props.children;
  }
  return null;
}

If.propTypes = {
  truthy: PropTypes.any,
};
