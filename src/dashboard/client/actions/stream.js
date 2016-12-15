import { TOGGLE_ACCOUNT } from '../constants/action-types';

export function toggleAccount(type, value) {
  return {
    type: TOGGLE_ACCOUNT,
    payload: { type, value },
  };
}
