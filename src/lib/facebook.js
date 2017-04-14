import superFetch from 'lib/fetch';
import sentry from 'lib/sentry';
import { FB_API_URL } from './config';

const FEED_FIELDS = 'message,permalink_url,created_time,admin_creator,caption,description,link,from{name,link,picture},to{name,link,picture},object_id,parent_id,picture,place,shares,source,status_type,story';

function mapPosts(post) {
  return {
    nativeId: post.id,
    url: post.permalink_url,
    message: post.message || post.description,
    link: post.link,
    name: post.name,
    picture: post.picture,
    caption: post.caption,
    description: post.description,
    date: new Date(post.created_time),
    authorName: post.from.name,
    authorImgUrl: post.from.picture ? post.from.picture.data.url : null,
    authorUrl: post.from.link,
    data: post,
    type: 'facebook',
  };
}

function fetch(url, options) {
  sentry.captureBreadcrumb({
    message: 'facebook fetch',
    data: { url, options },
    category: 'worker',
  });
  return superFetch(FB_API_URL + url, {
    ...options,
    credentials: 'omit',
  });
}

export default function getFacebookClient({ token }) {
  const getQuery = (query) => ({
    access_token: token,
    ...query,
  });

  const client = {
    async getPost(id) {
      sentry.captureBreadcrumb({
        message: 'facebook.getPost',
        data: { id },
        category: 'worker',
      });
      return fetch(`/${id}`, {
        query: getQuery({
          fields: 'link',
        }),
      });
    },
    async getPhoto(id) {
      sentry.captureBreadcrumb({
        message: 'facebook.getPhoto',
        data: { id },
        category: 'worker',
      });
      return fetch(`/${id}`, {
        query: getQuery({
          fields: 'link',
        }),
      });
    },
    async getPosts(id, options = {}) {
      sentry.captureBreadcrumb({
        message: 'facebook.getPosts',
        data: { id, options },
        category: 'worker',
      });
      const res = await fetch(`/${id || 'me'}/feed`, {
        query: getQuery({
          fields: FEED_FIELDS,
          since: options.since,
        }),
      });
      sentry.captureBreadcrumb({
        message: 'facebook.getPosts',
        data: res,
        category: 'worker',
      });
      res.body.posts = res.body.data.map(mapPosts);
      return res;
    },
    /**
     * Publish a new status message.
     * @name update
     * @param {string} id
     * @param {object} options
     * @param {string} options.message
     * @param {string} options.link
     * @param {string} options.picture      - Link picture.
     * @param {string} options.name         - Link name.
     * @param {string} options.caption      - Link caption.
     * @param {string} options.description  - Link description.
     */
    async publish(id, options) {
      sentry.captureBreadcrumb({
        message: 'facebook.publish',
        data: { id, options },
        category: 'worker',
      });
      if (!options.message && !options.link && !options.imgUrl) {
        throw new Error('Message or link required.');
      }
      if (options.imgUrl) {
        return fetch(`/${id}/photos`, {
          method: 'POST',
          query: getQuery({
            fields: 'link',
          }),
          body: {
            caption: options.message,
            url: options.imgUrl,
          },
        });
      }
      return fetch(`/${id}/feed`, {
        method: 'POST',
        query: getQuery({
          fields: 'link',
        }),
        body: {
          message: options.message,
        },
      });
    },
  };

  return client;
}
