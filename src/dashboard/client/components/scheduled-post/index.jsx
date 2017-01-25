import React, { PropTypes } from 'react';
import noop from 'lodash/noop';
import FacebookScheduledPost from './facebook-scheduled-post';
import TwitterScheduledPost from './twitter-scheduled-post';
import TwitterScheduledRetweet from './twitter-scheduled-retweet';
import LinkedinScheduledPost from './linkedin-scheduled-post';

const postMap = {
  facebook: FacebookScheduledPost,
  twitter: TwitterScheduledPost,
  retweet: TwitterScheduledRetweet,
  linkedin: LinkedinScheduledPost,
};

export default function UniversalScheduledPost({ children, post, type, onRemove }) {
  const InnerPost = postMap[type];
  return (
    <InnerPost post={post} onRemove={onRemove}>
      {children}
    </InnerPost>
  );
}

UniversalScheduledPost.propTypes = {
  children: PropTypes.node,
  post: PropTypes.object,
  onRemove: PropTypes.func,
  type: PropTypes.oneOf(['facebook', 'twitter', 'retweet', 'linkedin']),
};

UniversalScheduledPost.defaultProps = {
  onRemove: noop,
};
