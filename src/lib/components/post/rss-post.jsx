import React, { PropTypes } from 'react';
import Post from './post';
import PostActions from './actions';
import FavoriteButton from './favorite-button';
import PostButton from './post-button';
import ViewLink from './view-link';
import Icon from '../icon';

export default function RSSPost({ post }) {
  return (
    <Post
      post={post}
      type="rss"
      actions={(
        <PostActions>
          <FavoriteButton
            favorited={post.favorited}
            onClick={(e) => console.log('TODO')}
          />
          <PostButton
            onClick={(e) => console.log('TODO')}
          />
          <PostActions.Secondary>
            <ViewLink url={post.url} />
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
