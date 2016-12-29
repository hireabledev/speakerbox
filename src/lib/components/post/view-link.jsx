import React, { PropTypes } from 'react';
import Icon from '../icon';

export default function ViewLink({ url }) {
  return (
    <a className="sb-post-action" href={url}>
      <Icon name="external-link" label="external link" />
      {' '}
      View
    </a>
  );
}

ViewLink.propTypes = {
  url: PropTypes.string.isRequired,
};
