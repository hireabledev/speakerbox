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

export default function UniversalScheduledPost({ children, post, type, onRemove, waypoint }) {
  const InnerPost = postMap[type];
  return (
    <InnerPost post={post} onRemove={onRemove} waypoint={waypoint}>
      {children}
    </InnerPost>
  );
}

UniversalScheduledPost.propTypes = {
  children: PropTypes.node,
  post: PropTypes.object,
  onRemove: PropTypes.func,
  waypoint: PropTypes.node,
  type: PropTypes.oneOf(['facebook', 'twitter', 'retweet', 'linkedin']),
};

UniversalScheduledPost.defaultProps = {
  onRemove: noop,
};
