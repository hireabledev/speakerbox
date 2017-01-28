import React, { Component, PropTypes } from 'react';
import cn from 'classnames';
import moment from 'moment';
import { connect } from 'react-redux';
import Datetime from 'react-datetime';
import Link from 'react-router/lib/Link';
import Icon from 'lib/client/components/icon';
import { twitter } from '../../actions/posts';

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
    const { scheduledRetweet } = post;

    let retweeted = post.retweeted;

    if (scheduledRetweet && moment().isAfter(scheduledRetweet.date)) {
      retweeted = true;
    }

    return (scheduledRetweet && !retweeted) ? (
      <Link
        className={cn('sb-post-action', {
          active: post.scheduledRetweet,
        })}
        to={{ pathname: '/schedule', query: { id: scheduledRetweet.id } }}
      >
        <Icon name="retweet" label="retweet" />
        {' '}
        {retweeted ? 'Retweeted' : 'Retweet'}
      </Link>
    ) : (
      <span className="sb-post-retweet-button">
        <button
          className={cn('sb-post-action', {
            active: post.scheduledRetweet,
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
              return this.props.createScheduledRetweet(
                post.id,
                post.accountId,
                date && date.toISOString()
              );
            }}
          >
            <Datetime
              defaultValue={scheduledRetweet ? new Date(scheduledRetweet.date) : new Date()}
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
    scheduledRetweet: PropTypes.shape({
      id: PropTypes.string,
      date: PropTypes.string,
    }),
  }).isRequired,
  createScheduledRetweet: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  createScheduledRetweet: (postId, accountId, date) => (
    dispatch(twitter.createScheduledRetweet({
      twitterPostId: postId,
      accountId,
      date,
    }))
  ),
});

export default connect(null, mapDispatchToProps)(PostRetweetButton);
