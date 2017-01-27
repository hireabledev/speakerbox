import Mixpanel from 'mixpanel';
import noop from 'lodash/noop';
import { MIXPANEL_ID } from './config';

const mixpanel = MIXPANEL_ID
  ? Mixpanel.init(MIXPANEL_ID, {
    protocol: 'https',
  })
  : {
    track: noop,
    people: {
      set: noop,
      set_once: noop,
      increment: noop,
      append: noop,
      union: noop,
      track_charge: noop,
      clear_charges: noop,
      delete_user: noop,
    },
    alias: noop,
  };

export default mixpanel;
