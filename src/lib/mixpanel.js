import Mixpanel from 'mixpanel';
import { MIXPANEL_ID } from './config';

const mixpanel = MIXPANEL_ID
  ? Mixpanel.init(MIXPANEL_ID)
  : {};

export default mixpanel;
