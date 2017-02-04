import kue from 'kue';
import { authenticated, adminOnly } from './access-control';

kue.app.set('title', 'Job Queue - Speaker Box');

export default [
  authenticated,
  adminOnly,
  kue.app,
];
