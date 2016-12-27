export default async function superFetch(url, options = {}) {
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
