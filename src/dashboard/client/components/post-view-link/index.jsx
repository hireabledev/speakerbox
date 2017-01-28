import React, { PropTypes } from 'react';
import Icon from 'lib/client/components/icon';

export default function PostViewLink({ url }) {
  return (
    <a className="sb-post-action" href={url}>
      <Icon name="external-link" label="external link" />
      {' '}
      View
    </a>
  );
}

PostViewLink.propTypes = {
  url: PropTypes.string.isRequired,
};
