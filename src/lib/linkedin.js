import superFetch from 'lib/fetch';
import sentry from 'lib/sentry';
import { LINKEDIN_API_URL } from './config';

async function fetch(url, options) {
  sentry.captureBreadcrumb({
    message: 'linkedin fetch',
    data: { url, options },
    category: 'worker',
  });
  try {
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
      sentry.captureBreadcrumb({
        message: 'linkedin.share',
        data: { id, options },
        category: 'worker',
      });
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
      sentry.captureBreadcrumb({
        message: 'linkedin.share',
        data: { url, content: contentObject },
        category: 'worker',
      });
      return fetch(url, {
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
