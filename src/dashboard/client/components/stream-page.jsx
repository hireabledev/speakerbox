import React, { Component, PropTypes } from 'react';
import { Button } from 'react-bootstrap';
import Post from './post';

export default class StreamPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const posts = this.props.posts || [];

    return (
      <div className="container-fluid">
        <h1>Stream Page</h1>
        {posts.map(post => <Post key={post.id} post={post} />)}
        <Button bsStyle="primary" onClick={this.props.loadMorePosts}>Load More</Button>
      </div>
    );
  }
}

StreamPage.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
  })).isRequired,
  morePostsAvailable: PropTypes.bool.isRequired,
  loadMorePosts: PropTypes.func.isRequired,
};
