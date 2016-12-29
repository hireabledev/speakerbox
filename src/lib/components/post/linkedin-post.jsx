import React, { PropTypes } from 'react';
import Post from './post';
import PostActions from './actions';
import FavoriteButton from './favorite-button';
import PostButton from './post-button';
import Icon from '../icon';

export default function LinkedInPost({ post }) {
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
            <Icon name="share" label="share" />
            {' '}
            Share
          </button>
          <PostButton
            onClick={(e) => console.log('TODO')}
          />
          <PostActions.Secondary>
            <a className="sb-post-action" href={post.url} target="_blank" rel="noopener noreferrer">
              <Icon name="link" label="link" />
              {' '}
              View
            </a>
          </PostActions.Secondary>
        </PostActions>
      )}
    />
  );
}

LinkedInPost.propTypes = {
  post: PropTypes.shape({
    body: PropTypes.string,
    date: PropTypes.date,
    url: PropTypes.string,
    authorName: PropTypes.string,
    authorUrl: PropTypes.string,
    authorImgUrl: PropTypes.string,
    favorited: PropTypes.bool,
  }),
};
