import React, { PropTypes } from 'react';
import FacebookScheduledPost from './facebook-scheduled-post';
import TwitterScheduledPost from './twitter-scheduled-post';
import LinkedinScheduledPost from './linkedin-scheduled-post';

const postMap = {
  facebook: FacebookScheduledPost,
  twitter: TwitterScheduledPost,
  linkedin: LinkedinScheduledPost,
};

export default function UniversalScheduledPost({ children, post, type }) {
  const InnerPost = postMap[type];
  return (
    <InnerPost post={post}>
      {children}
    </InnerPost>
  );
}

UniversalScheduledPost.propTypes = {
  children: PropTypes.node,
  post: PropTypes.object,
  type: PropTypes.oneOf(['facebook', 'twitter', 'linkedin']),
};
