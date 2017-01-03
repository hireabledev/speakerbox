import superFetch from 'lib/fetch';
import { FB_API_URL } from './config';

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
        query: {
          fields: 'link',
        },
      });
    },
    async getPhoto(id) {
      return fetch(`/${id}`, {
        query: {
          fields: 'link',
        },
      });
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
        return fetch(`/${id}/photos`, {
          method: 'POST',
          query: getQuery(),
          body: {
            caption: options.message,
            url: options.imgUrl,
          },
        });
      }
      return fetch(`/${id}/feed`, {
        method: 'POST',
        query: getQuery(),
        body: {
          message: options.message,
        },
      });
    },
  };

  return client;
}
