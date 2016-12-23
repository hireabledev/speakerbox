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

export default function Post({ children, post, type }) {
  const InnerPost = postMap[type];
  return (
    <InnerPost post={post}>
      {children}
    </InnerPost>
  );
}

Post.propTypes = {
  children: PropTypes.node,
  post: PropTypes.object,
  type: PropTypes.oneOf(['rss', 'facebook', 'twitter', 'linkedin']),
};
