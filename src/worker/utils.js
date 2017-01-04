import moment from 'moment';

export function syncedRecently(account) {
  const fifteenMinutesAgo = moment().subtract(10, 'minutes');
  return moment(account.synced).isAfter(fifteenMinutesAgo);
}
