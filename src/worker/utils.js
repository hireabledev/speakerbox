import moment from 'moment';

export function syncedRecently(account) {
  if (!account.synced) {
    return false;
  }
  const fifteenMinutesAgo = moment().subtract(10, 'minutes');
  return moment(account.synced).isAfter(fifteenMinutesAgo);
}
