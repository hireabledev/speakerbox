import React, { PropTypes } from 'react';
import RSSPost from './rss-post';
import FacebookPost from './facebook-post';
import TwitterPost from './twitter-post';
import LinkedinPost from './linkedin-post';

const postMap = {
  rss: RSSPost,
  facebook: FacebookPost,
  twitter: TwitterPost,
  linkedin: LinkedinPost,
};

export default function UniversalPost({ children, post, waypoint, type }) {
  const InnerPost = postMap[type];
  return (
    <InnerPost post={post} waypoint={waypoint}>
      {children}
    </InnerPost>
  );
}

UniversalPost.propTypes = {
  children: PropTypes.node,
  post: PropTypes.object,
  type: PropTypes.oneOf(['rss', 'facebook', 'twitter', 'linkedin']),
  waypoint: PropTypes.node,
};
