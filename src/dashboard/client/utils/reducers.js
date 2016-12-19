import keyBy from 'lodash/keyBy';

export function mergeKeyById(itemsById, nextItems) {
  return {
    ...itemsById,
    ...keyBy(nextItems, 'id'),
  };
}
