import { expect } from 'chai';
import { mergeKeyById, replaceByIdOrAppend } from './reducers';

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

  it('should replaceByIdOrAppend existing item', () => {
    const items = [a1, b2, c3];
    const b2Alt = { id: 'b2', alt: true };
    const result = replaceByIdOrAppend(items, b2Alt);

    expect(result).to.have.length(3);
    expect(result[1]).to.equal(b2Alt);
    expect(result[1].alt).to.equal(true);
  });

  it('should replaceByIdOrAppend new item', () => {
    const items = [a1, b2];
    const result = replaceByIdOrAppend(items, c3);

    expect(result).to.have.length(3);
    expect(result[2]).to.equal(c3);
  });
});
