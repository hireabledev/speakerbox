import React, { Component, PropTypes } from 'react';
import { Button } from 'react-bootstrap';
import Page from './page';
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
      linkedInPosts = [],
      moreLinkedInPosts,
      rssPosts = [],
      moreRSSPosts,
    } = this.props;

    // const posts = facebookPosts.concat(twitterPosts).concat(linkedInPosts).concat(rssPosts);
    const morePosts = moreFacebookPosts || moreTwitterPosts || moreLinkedInPosts || moreRSSPosts;

    return (
      <Page bg="light">
        <div className="container-fluid">
          {facebookPosts.map(post => <Post key={post.id} post={post} type="facebook" />)}
          {twitterPosts.map(post => <Post key={post.id} post={post} type="twitter" />)}
          {linkedInPosts.map(post => <Post key={post.id} post={post} type="linkedin" />)}
          {rssPosts.map(post => <Post key={post.id} post={post} type="rss" />)}
          {morePosts && <Button bsStyle="primary" onClick={this.props.fetchPosts}>Load More</Button>}
        </div>
      </Page>
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
  linkedInPosts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
  })).isRequired,
  moreLinkedInPosts: PropTypes.bool.isRequired,
  rssPosts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
  })).isRequired,
  moreRSSPosts: PropTypes.bool.isRequired,
  fetchPosts: PropTypes.func.isRequired,
};
