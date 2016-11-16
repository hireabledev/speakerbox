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
      facebookPosts = [],
      moreFacebookPosts,
      twitterPosts = [],
      moreTwitterPosts,
      linkedinPosts = [],
      moreLinkedInPosts,
      rssPosts = [],
      moreRSSPosts,
    } = this.props;

    const posts = facebookPosts.concat(twitterPosts).concat(linkedinPosts).concat(rssPosts);
    const morePosts = moreFacebookPosts || moreTwitterPosts || moreLinkedInPosts || moreRSSPosts;

    return (
      <div className="container-fluid">
        <h1>Stream Page</h1>
        {posts.map(post => <Post key={post.id} post={post} type="facebook" />)}
        {morePosts && <Button bsStyle="primary" onClick={this.props.fetchPosts}>Load More</Button>}
      </div>
    );
  }
}

StreamPage.propTypes = {
  facebookPosts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
  })).isRequired,
  moreFacebookPosts: PropTypes.bool.isRequired,
  twitterPosts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
  })).isRequired,
  moreTwitterPosts: PropTypes.bool.isRequired,
  linkedinPosts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
  })).isRequired,
  moreLinkedInPosts: PropTypes.bool.isRequired,
  rssPosts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
  })).isRequired,
  moreRSSPosts: PropTypes.bool.isRequired,
  fetchPosts: PropTypes.func.isRequired,
};
