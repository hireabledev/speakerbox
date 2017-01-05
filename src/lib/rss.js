import FeedParser from 'feedparser';
import fetch from 'lib/fetch';

export default async function fetchFeed(url, options) {
  return new Promise((resolve, reject) => {
    const feedparser = new FeedParser(options);
    let meta;
    const items = [];

    feedparser.on('error', err => reject(err));
    feedparser.on('readable', function () {
      const stream = this;
      meta = stream.meta;
      let item;
      while (item !== null) {
        item = stream.read();
        if (item) {
          items.push(item);
        }
      }
    });
    feedparser.on('end', () => {
      resolve({ meta, items });
    });

    fetch(url, {
      credentials: 'omit',
      parseJson: false,
      headers: {
        Accept: 'application/xhtml+xml',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36',
        'Content-Type': 'application/rss+xml',
      },
    })
      .then(({ res }) => res.body.pipe(feedparser))
      .catch(reject);
  });
}
