import React, { PropTypes } from 'react';
import Post from './post';
import PostActions from '../post-actions';
import PostFavoriteButton from '../post-favorite-button';
import PostScheduleButton from '../post-schedule-button';
import PostViewLink from '../post-view-link';

export default function RSSPost({ post }) {
  return (
    <Post
      post={post}
      actions={(
        <PostActions>
          <PostFavoriteButton
            favorited={post.favorited}
            onClick={(e) => console.log('TODO')}
          />
          <PostScheduleButton
            onClick={(e) => console.log('TODO')}
          />
          <PostActions.Secondary>
            <PostViewLink url={post.url} />
          </PostActions.Secondary>
        </PostActions>
      )}
    />
  );
}

RSSPost.propTypes = {
  post: PropTypes.shape({
    body: PropTypes.string,
    date: PropTypes.date,
    url: PropTypes.string,
    favorited: PropTypes.bool,
  }).isRequired,
};
