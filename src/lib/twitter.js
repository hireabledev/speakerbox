import Twit from 'twit';
import fetch from 'lib/fetch';
import { TWITTER_KEY, TWITTER_SECRET } from './config';

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

  client.retweet = retweet;
  client.update = update;

  return client;
}
