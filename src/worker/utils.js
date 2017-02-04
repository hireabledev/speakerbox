import moment from 'moment';
import {
  ACCOUNT_FETCH_DELAY,
  RSS_FETCH_DELAY,
} from 'lib/config';

export function syncedRecently(account) {
  if (!account.synced) {
    return false;
  }
  const ms = Math.min(
    ACCOUNT_FETCH_DELAY,
    RSS_FETCH_DELAY
  );
  const time = moment().subtract(ms + 1, 'ms');
  return moment(account.synced).isAfter(time);
}
