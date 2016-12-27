import keyBy from 'lodash/keyBy';
import findIndex from 'lodash/findIndex';

export function mergeKeyById(itemsById, nextItems) {
  return {
    ...itemsById,
    ...keyBy(nextItems, 'id'),
  };
}

export function replaceByIdOrAppend(items, item) {
  const newItems = [...items];
  let index = findIndex(items, { id: item.id });
  if (index === -1) {
    index = newItems.length;
  }
  newItems.splice(index, 1, item);
  return newItems;
}
