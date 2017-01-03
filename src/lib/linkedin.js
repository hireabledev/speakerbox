import superFetch from 'lib/fetch';
import { LINKEDIN_API_URL } from './config';

function fetch(url, options) {
  return superFetch(LINKEDIN_API_URL + url, {
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
}

export default function getLinkedinClient({ token }) {
  const getHeaders = (headers) => ({
    Authorization: `Bearer ${token}`,
    ...headers,
  });

  return {
    share(id, options) {
      const url = id ? `/companies/${id}/shares` : '/people/~/shares';
      let content;
      if (options.contentTitle) {
        content = {
          title: options.contentTitle,
          description: options.contentDescription,
          'submitted-url': options.contentUrl,
          'submitted-image-url': options.contentImgUrl,
        };
      }
      return fetch(url, {
        method: 'POST',
        headers: getHeaders(),
        body: {
          content,
          comment: options.message,
          visibility: {
            code: options.visibility || 'anyone',
          },
        },
      });
    },
  };
}
