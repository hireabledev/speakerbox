import React, { PropTypes } from 'react';
import trim from 'lodash/trim';
import truncate from 'lodash/truncate';
import Post from './post';
import PostActions from '../post-actions';
import PostFavoriteButton from '../post-favorite-button';
import PostScheduleButton from '../post-schedule-button';
import PostViewLink from '../post-view-link';

export default function RSSPost({ post, waypoint }) {
  let text = post.message;

  try {
    const fragment = document.createDocumentFragment();
    const div = document.createElement('div');
    div.innerHTML = post.message;
    fragment.appendChild(div);
    text = truncate(trim(fragment.textContent), { length: 300 });
  } catch (err) {
    console.warn('Could not get RSS Post text.');
  }

  return (
    <Post
      post={{
        ...post,
        message: (<span dangerouslySetInnerHTML={{ __html: text }} />),
      }}
      waypoint={waypoint}
      actions={(
        <PostActions>
          <PostFavoriteButton post={post} />
          <PostScheduleButton post={{ ...post, message: text }} />
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
    type: PropTypes.string,
    message: PropTypes.string,
    date: PropTypes.date,
    url: PropTypes.string,
    favorited: PropTypes.string,
  }).isRequired,
  waypoint: PropTypes.node,
};
