import { notifSend } from 'redux-notifications/lib/actions';

export function notify(data) {
  return notifSend({
    dismissAfter: 3000,
    ...data,
  });
}

export function notifySuccess(message) {
  return notify({
    message,
    kind: 'success',
  });
}

export function notifyError(err) {
  const message = err.message || `${err.status} ${err.statusText}: ${err.url}`;
  return notify({
    message,
    kind: 'danger',
    dismissAfter: 6000,
  });
}
