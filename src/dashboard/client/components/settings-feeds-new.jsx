import React, { PropTypes } from 'react';
import Link from 'react-router/lib/Link';
import { PageTitle } from 'lib/components/page';
import FeedForm from './feed-form';

export default function SettingsFeedsNewPage(props) {
  return (
    <div>
      <PageTitle>Add Feed</PageTitle>
      <FeedForm
        onSuccess={() => props.history.push('/settings/feeds')}
        cancelButton={(
          <Link to="/settings/feeds" className="btn btn-secondary">Cancel</Link>
        )}
      />
    </div>
  );
}

SettingsFeedsNewPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
