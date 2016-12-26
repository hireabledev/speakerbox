import { notifSend } from 'redux-notifications/lib/actions';

export function notify(data) {
  return notifSend({
    ...data,
    dismissAfter: 3000,
  });
}
