import moment from 'moment';
import { FB_FETCH_DELAY, TWITTER_FETCH_DELAY, LINKEDIN_FETCH_DELAY } from 'lib/config';

export function syncedRecently(account) {
  if (!account.synced) {
    return false;
  }
  const ms = Math.min(FB_FETCH_DELAY, TWITTER_FETCH_DELAY, LINKEDIN_FETCH_DELAY);
  const time = moment().subtract(ms, 'ms');
  return moment(account.synced).isAfter(time);
}
