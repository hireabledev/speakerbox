export function getVisibilityFromQuery(query) {
  const result = {};
  if (!query) {
    return result;
  }
  if (typeof query === 'string') {
    query = query.split(','); // eslint-disable-line no-param-reassign
  }
  query.forEach(key => { result[key] = true; });
  return result;
}
