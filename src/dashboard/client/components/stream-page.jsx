import React, { Component, PropTypes } from 'react';
import { Button } from 'react-bootstrap';
import Post from './post';

export default class StreamPage extends Component {
  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {
    this.props.fetchPosts();
  }

  render() {
    const {
      posts = [],
      morePosts,
    } = this.props;

    return (
      <div className="container-fluid">
        <h1>Stream Page</h1>
        {posts.map(post => <Post key={post.id} post={post} />)}
        {morePosts && <Button bsStyle="primary" onClick={this.props.fetchPosts}>Load More</Button>}
      </div>
    );
  }
}

StreamPage.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
  })).isRequired,
  morePosts: PropTypes.bool.isRequired,
  fetchPosts: PropTypes.func.isRequired,
};
