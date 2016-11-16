const initialState = {
  accounts: [],
  moreAccounts: false,
};

export default function accountsReducer(state = initialState, action) {
  switch (action.type) {
    case 'RECEIVE_ACCOUNTS':
      return {
        accounts: [...state.accounts, ...action.payload.accounts],
        moreAccounts: action.payload.more,
      };
    default:
      return state;
  }
}
