import React, { PropTypes } from 'react';
import Icon from 'lib/components/icon';
import Post from './post';
import PostActions from '../post-actions';
import PostFavoriteButton from '../post-favorite-button';
import PostScheduleButton from '../post-schedule-button';
import PostViewLink from '../post-view-link';

export default function TwitterPost({ post }) {
  return (
    <Post
      post={post}
      actions={(
        <PostActions>
          <PostFavoriteButton post={post} />
          <button className="sb-post-action" type="button">
            <Icon name="retweet" label="retweet" />
            {' '}
            Retweet
          </button>
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

TwitterPost.propTypes = {
  post: PropTypes.shape({
    body: PropTypes.string,
    date: PropTypes.date,
    url: PropTypes.string,
    authorName: PropTypes.string,
    authorUrl: PropTypes.string,
    authorImgUrl: PropTypes.string,
    favorited: PropTypes.string,
  }).isRequired,
};
