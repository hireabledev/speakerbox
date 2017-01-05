import React, { PropTypes } from 'react';
import Post from './post';
import PostActions from '../post-actions';
import PostFavoriteButton from '../post-favorite-button';
import PostScheduleButton from '../post-schedule-button';
import PostViewLink from '../post-view-link';

export default function RSSPost({ post }) {
  return (
    <Post
      post={{
        ...post,
        message: (<span dangerouslySetInnerHTML={{ __html: post.message }} />),
      }}
      actions={(
        <PostActions>
          <PostFavoriteButton post={post} />
          {/* <PostScheduleButton
            onClick={(e) => console.log('TODO')}
          /> */}
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
};
