import Twit from 'twit';
import { TWITTER_KEY, TWITTER_SECRET } from './config';

function retweet(id) {
  return this.post('statuses/retweet/:id', { id });
}

export default function getTwitterClient({ token, tokenSecret }) {
  const options = {
    consumer_key: TWITTER_KEY,
    consumer_secret: TWITTER_SECRET,
    access_token: token,
    access_token_secret: tokenSecret,
  };

  const client = new Twit(options);

  client.retweet = retweet;

  return client;
}
