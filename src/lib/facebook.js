import superFetch from 'lib/fetch';
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
      return fetch(`/${id}`, {
        query: getQuery({
          fields: 'link',
        }),
      });
    },
    async getPhoto(id) {
      return fetch(`/${id}`, {
        query: getQuery({
          fields: 'link',
        }),
      });
    },
    async getPosts(id, options = {}) {
      const res = await fetch(`/${id || 'me'}/feed`, {
        query: getQuery({
          fields: FEED_FIELDS,
          since: options.since,
        }),
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
      if (!options.message && !options.link && !options.imgUrl) {
        throw new Error('Message or link required.');
      }
      if (options.imgUrl) {
        return await fetch(`/${id}/photos`, {
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
      return await fetch(`/${id}/feed`, {
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
