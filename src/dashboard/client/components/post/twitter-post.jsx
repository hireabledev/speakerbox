import React, { PropTypes } from 'react';
import Post from './post';
import PostActions from '../post-actions';
import PostFavoriteButton from '../post-favorite-button';
import PostRetweetButton from '../post-retweet-button';
import PostScheduleButton from '../post-schedule-button';
import PostViewLink from '../post-view-link';

export default function TwitterPost({ post }) {
  return (
    <Post
      post={post}
      actions={(
        <PostActions>
          <PostFavoriteButton post={post} />
          <PostRetweetButton post={post} />
          <PostScheduleButton post={post} />
          <PostActions.Secondary>
            <PostViewLink url={post.url} />
          </PostActions.Secondary>
        </PostActions>
      )}
    />
  );
}

TwitterPost.propTypes = {
  post: PropTypes.shape({
    type: PropTypes.string,
    message: PropTypes.string,
    date: PropTypes.date,
    url: PropTypes.string,
    authorName: PropTypes.string,
    authorUrl: PropTypes.string,
    authorImgUrl: PropTypes.string,
    favorited: PropTypes.string,
  }).isRequired,
};
