import React, { PropTypes } from 'react';
import Icon from 'lib/client/components/icon';
import Post from './post';
import PostActions from '../post-actions';
import PostFavoriteButton from '../post-favorite-button';
import PostScheduleButton from '../post-schedule-button';
import PostViewLink from '../post-view-link';

function getFacebookShareUrl(url) {
  return `https://www.facebook.com/sharer.php?u=${url}`;
}

export default function FacebookPost({ post, waypoint }) {
  return (
    <Post
      post={post}
      waypoint={waypoint}
      actions={(
        <PostActions>
          <PostFavoriteButton post={post} />
          <a
            className="sb-post-action"
            href={getFacebookShareUrl(post.url)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="share" label="share" />
            {' '}
            Share Now
          </a>
          <PostScheduleButton post={post} />
          <PostActions.Secondary>
            <PostViewLink url={post.url} />
          </PostActions.Secondary>
        </PostActions>
      )}
    />
  );
}

FacebookPost.propTypes = {
  post: PropTypes.shape({
    type: PropTypes.string,
    body: PropTypes.string,
    date: PropTypes.date,
    url: PropTypes.string,
    authorName: PropTypes.string,
    authorUrl: PropTypes.string,
    authorImgUrl: PropTypes.string,
    favorited: PropTypes.string,
  }).isRequired,
  waypoint: PropTypes.node,
};
