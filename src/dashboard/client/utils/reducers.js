import keyBy from 'lodash/keyBy';
import findIndex from 'lodash/findIndex';

export function mergeKeyById(itemsById, nextItems) {
  return {
    ...itemsById,
    ...keyBy(nextItems, 'id'),
  };
}

export function replaceByIdOrAppend(items, input) {
  const result = [...items];
  let newItems = input;
  if (Array.isArray(newItems) === false) {
    newItems = [input];
  }
  newItems.forEach(item => {
    let index = findIndex(result, { id: item.id });
    if (index === -1) {
      index = result.length;
    }
    result.splice(index, 1, item);
  });
  return result;
}
