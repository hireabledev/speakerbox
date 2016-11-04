import Mixpanel from 'mixpanel';
import { MIXPANEL_ID } from './config';
import { mixpanel as debug } from './debug';

if (!MIXPANEL_ID) {
  debug.warn('MIXPANEL_ID is undefined.');
}

const mixpanel = MIXPANEL_ID
  ? Mixpanel.init(MIXPANEL_ID)
  : {};

export default mixpanel;
