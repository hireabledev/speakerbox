import qs from 'qs';

export default async function superFetch(url, options = {}) {
  const contentType = options.body instanceof FormData
    ? {}
    : { 'Content-Type': 'application/json' };
  const fetchOptions = {
    credentials: 'include',
    ...options,
    headers: {
      ...contentType,
      ...options.headers,
    },
  };

  if (options.body && fetchOptions.headers['Content-Type'] === 'application/json') {
    fetchOptions.body = JSON.stringify(options.body);
  }

  if (options.query) {
    url += `?${qs.stringify(options.query)}`; // eslint-disable-line no-param-reassign
  }

  const res = await fetch(url, fetchOptions);
  const result = { res, body: res.body };

  try {
    result.body = await res.json();
  } catch (err) {
    console.warn(err);
  }

  if (res.status >= 200 && res.status < 400) {
    return result;
  }

  throw result;
}
