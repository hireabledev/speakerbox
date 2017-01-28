import {
  TOGGLE_MENU,
} from '../constants/action-types';

const initialState = {
  expanded: false,
};

export default function menuReducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_MENU:
      return {
        ...state,
        expanded: !state.expanded,
      };
    default:
      return state;
  }
}
