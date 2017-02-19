import React, { Component, PropTypes } from 'react';
import cn from 'classnames';
import moment from 'moment';
import { connect } from 'react-redux';
import Datetime from 'react-datetime';
import Link from 'react-router/lib/Link';
import Icon from 'lib/client/components/icon';
import { createScheduledPost } from '../../actions/posts';

export class PostRetweetButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      date: null,
    };
  }

  render() {
    const { post } = this.props;
    const { scheduledPost } = post;

    let retweeted = post.retweeted;

    if (scheduledPost && moment().isAfter(scheduledPost.date)) {
      retweeted = true;
    }

    return (scheduledPost && !retweeted) ? (
      <Link
        className={cn('sb-post-action', {
          active: post.scheduledPost,
        })}
        to={{ pathname: '/schedule', query: { id: scheduledPost.id } }}
      >
        <Icon name="retweet" label="retweet" />
        {' '}
        {retweeted ? 'Retweeted' : 'Retweet'}
      </Link>
    ) : (
      <span className="sb-post-retweet-button">
        <button
          className={cn('sb-post-action', {
            active: post.scheduledPost,
          })}
          type="button"
          disabled={retweeted}
          onClick={() => this.setState({ visible: !this.state.visible })}
        >
          <Icon
            fixedWidth
            name={this.state.visible ? 'remove' : 'retweet'}
            label={this.state.visible ? 'remove' : 'retweet'}
          />
          {' '}
          {retweeted ? 'Retweeted' : 'Retweet'}
        </button>
        {this.state.visible && (
          <form
            className="form form-inline"
            onSubmit={(e) => {
              e.preventDefault();
              const date = this.state.date;
              this.setState({ visible: false });
              return this.props.createScheduledPost(
                post.id,
                post.accountId,
                date && date.toISOString()
              );
            }}
          >
            <Datetime
              defaultValue={scheduledPost ? new Date(scheduledPost.date) : new Date()}
              isValidDate={currentDate => currentDate.isAfter(new Date())}
              onChange={date => this.setState({ date })}
            />
            <button
              className="btn btn-primary"
              type="submit"
            >
              <Icon name="retweet" label="retweet" /> Retweet
            </button>
          </form>
        )}
      </span>
    );
  }
}

PostRetweetButton.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string,
    retweeted: PropTypes.bool,
    scheduledPost: PropTypes.shape({
      id: PropTypes.string,
      date: PropTypes.string,
    }),
  }).isRequired,
  createScheduledPost: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  createScheduledPost: (postId, accountId, date) => (
    dispatch(createScheduledPost({
      postId,
      accountId,
      date,
    }))
  ),
});

export default connect(null, mapDispatchToProps)(PostRetweetButton);
