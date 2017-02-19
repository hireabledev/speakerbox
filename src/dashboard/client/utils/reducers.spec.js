import { expect } from 'chai';
import { mergeKeyById } from './reducers';

describe('reducer utils', () => {
  const a1 = { id: 'a1' };
  const b2 = { id: 'b2' };
  const c3 = { id: 'c3' };

  it('should mergeKeyById', () => {
    const itemsById = { a1, b2 };
    const nextItems = [c3];

    expect(mergeKeyById(itemsById, nextItems))
      .to.deep.equal({ a1, b2, c3 });
  });
});
