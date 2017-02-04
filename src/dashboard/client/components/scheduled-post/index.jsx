import React, { PropTypes } from 'react';
import noop from 'lodash/noop';
import FacebookScheduledPost from './facebook-scheduled-post';
import TwitterScheduledPost from './twitter-scheduled-post';
import TwitterScheduledRetweet from './twitter-scheduled-retweet';
import LinkedinScheduledPost from './linkedin-scheduled-post';

const postMap = {
  facebook: FacebookScheduledPost,
  twitter: TwitterScheduledPost,
  linkedin: LinkedinScheduledPost,
};

export default function UniversalScheduledPost({ children, post, type, onRemove, waypoint }) {
  let InnerPost = postMap[type];
  if (type === 'twitter' && post.postId) {
    InnerPost = TwitterScheduledRetweet;
  }
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
  type: PropTypes.oneOf(['facebook', 'twitter', 'linkedin']),
};

UniversalScheduledPost.defaultProps = {
  onRemove: noop,
};
