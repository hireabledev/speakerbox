import { LINKEDIN_API_URL } from './config';

const defaultHeaders = {
  'Content-Type': 'application/json',
  'x-li-format': 'json',
};

function request(url, options) {
  return fetch(`${LINKEDIN_API_URL}${url}`, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  });
}

export default function getLinkedInClient({ token }) {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return {
    share(id, body) {
      return request('/people/~/shares?format=json', {
        method: 'POST',
        headers,
        body,
      });
    },
  };
}
