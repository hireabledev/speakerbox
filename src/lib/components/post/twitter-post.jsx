import React, { PropTypes } from 'react';
import Post from './post';
import PostActions from './actions';
import FavoriteButton from './favorite-button';
import ViewLink from './view-link';
import PostButton from './post-button';
import Icon from '../icon';

export default function TwitterPost({ post }) {
  return (
    <Post
      post={post}
      actions={(
        <PostActions>
          <FavoriteButton
            favorited={post.favorited}
            onClick={(e) => console.log('TODO')}
          />
          <button className="sb-post-action" type="button">
            <Icon name="retweet" label="retweet" />
            {' '}
            Retweet
          </button>
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

TwitterPost.propTypes = {
  post: PropTypes.shape({
    body: PropTypes.string,
    date: PropTypes.date,
    url: PropTypes.string,
    authorName: PropTypes.string,
    authorUrl: PropTypes.string,
    authorImgUrl: PropTypes.string,
    favorited: PropTypes.bool,
  }).isRequired,
};
