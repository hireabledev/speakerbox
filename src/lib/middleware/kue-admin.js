import kue from 'kue';
import basicAuth from 'basic-auth-connect';
import { KUE_USER, KUE_PWD } from 'lib/config';

kue.app.set('title', 'Job Queue - Speaker Box');

export default [
  basicAuth(KUE_USER, KUE_PWD),
  kue.app,
];
