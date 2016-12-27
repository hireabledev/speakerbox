export default function superFetch(url, options = {}) {
  const fetchOptions = {
    credentials: 'include',
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };

  if (options.body) {
    fetchOptions.body = JSON.stringify(options.body);
  }

  return fetch(url, fetchOptions)
    .then(res => {
      if (res.status >= 200 && res.status < 400) {
        return res;
      }
      const err = {
        message: `${res.status} ${res.statusText} ${res.url}`,
        response: res,
      };
      throw err;
    });
}
