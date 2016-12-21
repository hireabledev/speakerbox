import React, { PropTypes } from 'react';
import DisplayDate from '../display-date';
import { PostActions, PostAction } from '../post-actions';
import PostAuthor from '../post-author';
import PostAuthorImg from '../post-author-img';
import PostMeta from '../post-meta';

export default function TwitterPost({ post }) {
  return (
    <article className="sb-post">
      <div className="sb-post-body">
        <PostAuthorImg name={post.authorName} url={post.authorUrl} imgUrl={post.authorImgUrl} />
        <div className="sb-post-container">
          <PostMeta position="top">
            <PostMeta.Primary>
              <PostAuthor name={post.authorName} url={post.authorUrl} />
              {' '}
              <DisplayDate className="sb-post-date" date={post.date} />
            </PostMeta.Primary>
          </PostMeta>
          <p className="sb-post-content">
            {post.body}
          </p>
          {/*<PostMeta>
            <PostMeta.Primary>
              {' '}
            </PostMeta.Primary>
            <PostMeta.Secondary>
              <a
                href={post.url}
                rel="noopener noreferrer"
                target="_blank"
              >
                url
              </a>
            </PostMeta.Secondary>
          </PostMeta>*/}
        </div>
      </div>
      <PostActions>
        <PostAction>Share Now</PostAction>
        <PostAction>Share Later</PostAction>
      </PostActions>
    </article>
  );
}

TwitterPost.propTypes = {
  post: PropTypes.shape({
    body: PropTypes.string,
    date: PropTypes.date,
    authorName: PropTypes.string,
    authorUrl: PropTypes.string,
    authorImgUrl: PropTypes.string,
  }),
};
