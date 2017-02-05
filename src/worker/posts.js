import { Account, Post } from 'lib/models';
import facebookClient from 'lib/facebook';
import twitterClient from 'lib/twitter';
import linkedinClient from 'lib/linkedin';

export async function getAccountPosts(account) {
  switch (account.type) {
    case 'facebook': {
      const facebook = facebookClient({ token: account.accessToken });
      return facebook.getPosts(null, { since: account.synced });
    }
    case 'twitter': {
      const lastPost = await Post.findOne({
        where: { type: 'twitter' },
        include: [{
          model: Account,
          as: 'Account',
          where: { id: account.id },
        }],
        order: [['date', 'DESC']],
      });

      const twitter = twitterClient({
        token: account.accessToken,
        tokenSecret: account.tokenSecret,
      });
      const getOptions = lastPost ? { sinceId: lastPost.nativeId } : {};
      return twitter.getPosts(getOptions);
    }
    default:
      throw new Error('Invalid account type');
  }
}

export async function processScheduledPost(scheduledPost, account) {
  const { message, imgUrl } = scheduledPost;

  switch (scheduledPost.type) {
    case 'facebook': {
      const facebook = facebookClient({
        token: account.accessToken,
      });

      const { body } = await facebook.publish(account.id, {
        message,
        imgUrl,
      });

      return {
        url: body.link,
      };
    }
    case 'twitter': {
      const twitter = twitterClient({
        token: account.accessToken,
        tokenSecret: account.tokenSecret,
      });

      let data;

      if (scheduledPost.postId) {
        data = (await twitter.retweet(scheduledPost.post.nativeId)).data;
      } else {
        data = (await twitter.update(message, imgUrl)).data;
      }

      if (data.errors && data.errors.length) {
        throw new Error(data.errors.map(err => `${err.message} (${err.code})`).join('\n'));
      }

      return {
        url: `https://twitter.com/${data.user.screen_name}/status/${data.id_str}`,
      };
    }
    case 'linkedin': {
      const linkedin = linkedinClient({
        token: account.accessToken,
      });

      const { body } = await linkedin.share(null, {
        comment: message,
        imgUrl,
      });

      return {
        url: body.updateUrl,
      };
    }
    default:
      throw new Error('Unknow scheduledPost type.');
  }
}
