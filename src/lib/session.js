import session from 'express-session';
import sequelizeStore from 'connect-session-sequelize';

import { IS_PROD, SECRET } from './config';
import './models/session.model';

const SequelizeStore = sequelizeStore(session.Store);

export default function (sequelize) {
  return session({
    store: new SequelizeStore({
      db: sequelize,
      table: 'Session',
    }),
    secret: SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: IS_PROD,
    },
  });
}
