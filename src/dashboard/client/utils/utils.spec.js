import { expect } from 'chai';
import { getVisibilityFromQuery } from './';

describe('getVisibilityFromQuery', () => {
  it('should return empty object for no query', () => {
    expect(getVisibilityFromQuery())
      .to.deep.equal({});
  });
  it('should work for comma separated values', () => {
    expect(getVisibilityFromQuery('a1,b2'))
      .to.deep.equal({
        a1: true,
        b2: true,
      });
  });
  it('should work for arrays', () => {
    expect(getVisibilityFromQuery(['a1', 'b2']))
      .to.deep.equal({
        a1: true,
        b2: true,
      });
  });
});
