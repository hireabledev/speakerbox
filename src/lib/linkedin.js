import superFetch from 'lib/fetch';
import { LINKEDIN_API_URL } from './config';

async function fetch(url, options) {
  try {
    return await superFetch(LINKEDIN_API_URL + url, {
      ...options,
      credentials: 'omit',
      headers: {
        'Content-Type': 'application/json',
        'x-li-format': 'json',
        ...options.headers,
      },
      query: {
        format: 'json',
        ...options.query,
      },
    });
  } catch (err) {
    if (err.body) {
      throw new Error(`${err.body.status} ${err.body.message} (${err.body.errorCode})`);
    }
    throw err;
  }
}

export default function getLinkedinClient({ token }) {
  const getHeaders = (headers) => ({
    Authorization: `Bearer ${token}`,
    ...headers,
  });

  return {
    async share(id, options) {
      const url = id ? `/companies/${id}/shares` : '/people/~/shares';
      let contentObject = {};
      if (options.contentTitle && options.contentUrl) {
        contentObject = {
          content: {
            title: options.contentTitle,
            description: options.contentDescription,
            'submitted-url': options.contentUrl,
            'submitted-image-url': options.contentImgUrl,
          },
        };
      }
      return await fetch(url, {
        method: 'POST',
        headers: getHeaders(),
        body: {
          ...contentObject,
          comment: options.comment,
          visibility: {
            code: options.visibility || 'anyone',
          },
        },
      });
    },
  };
}
