import Twit from 'twit';
import fetch from 'lib/fetch';
import { TWITTER_KEY, TWITTER_SECRET } from './config';

function mapPosts(post) {
  return {
    id: post.id_str,
    url: `https://twitter.com/${post.user.screen_name}/${post.id}`,
    message: post.text,
    date: new Date(post.created_at),
    authorName: post.user.name,
    authorImgUrl: post.user.profile_image_url_https,
    authorUrl: `https://twitter.com/${post.user.screen_name}`,
    data: post,
  };
}

async function getPosts(options) {
  const res = await this.get('statuses/home_timeline', {
    since_id: options.sinceId,
  });
  res.body = { posts: res.data.map(mapPosts) };
  return res;
}

async function retweet(id) {
  return await this.post('statuses/retweet/:id', { id });
}

async function update(message, imgUrl) {
  const body = { status: message };
  if (imgUrl) {
    const { res } = await fetch(imgUrl, { parseJson: false });
    const buffer = await res.buffer();
    const media = buffer.toString('base64');
    const { data } = await this.post('media/upload', { media_data: media });
    body.media_ids = [data.media_id_string];
  }
  return await this.post('statuses/update', body);
}

export default function getTwitterClient({ token, tokenSecret }) {
  const options = {
    consumer_key: TWITTER_KEY,
    consumer_secret: TWITTER_SECRET,
    access_token: token,
    access_token_secret: tokenSecret,
  };

  const client = new Twit(options);

  client.getPosts = getPosts;
  client.retweet = retweet;
  client.update = update;

  return client;
}
