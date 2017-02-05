import { expect } from 'chai';
import reducer from './accounts';
import { RECEIVE_ACCOUNTS, RECEIVE_REMOVE_ACCOUNT } from '../constants/action-types';

describe('accounts reducer', () => {
  let initialState;

  beforeEach(() => {
    initialState = reducer(undefined, {});
  });

  const a1 = { id: 'a1' };
  const a2 = { id: 'a2' };

  it('should have initial state', () => {
    expect(initialState).to.have.all.keys([
      'accounts',
      'accountsById',
      'moreAccounts',
    ]);
  });

  it('should receive accounts', () => {
    const action = {
      type: RECEIVE_ACCOUNTS,
      payload: {
        accounts: [a1, a2],
      },
    };

    const state = reducer(initialState, action);

    expect(state.accounts).to.have.length(2);
    expect(state.accountsById.a1).to.equal(a1);
    expect(state.accountsById.a2).to.equal(a2);
  });

  it('should remove account', () => {
    initialState = {
      accounts: [a1],
      accountsById: {
        [a1.id]: a1,
      },
    };

    const action = {
      type: RECEIVE_REMOVE_ACCOUNT,
      payload: {
        id: a1.id,
      },
    };

    const state = reducer(initialState, action);

    expect(state.accounts).to.have.length(0);
    expect(state.accountsById).to.not.have.any.keys(a1.id);
  });
});
