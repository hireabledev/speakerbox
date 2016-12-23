import { RECEIVE_USER } from '../constants/action-types';

const initialState = {
  user: {},
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_USER:
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload.user,
        },
      };
    default:
      return state;
  }
}
