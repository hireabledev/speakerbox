function url(db) {
  return `${db.dialect}://${db.username}:${db.password}@${db.host}:5432/${db.database}`;
}

export const development = {
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PWD || null,
  database: process.env.DB_NAME || 'speakerbox_dev',
  host: process.env.DB_HOST || '127.0.0.1',
  dialect: process.env.DB_DIALECT || 'postgres',
  dialectOptions: process.env.DB_DIALECT_OPTIONS
                    ? JSON.parse(process.env.DB_DIALECT_OPTIONS)
                    : null,
};

export const test = {
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PWD || null,
  database: process.env.DB_NAME || 'speakerbox_test',
  host: process.env.DB_HOST || '127.0.0.1',
  dialect: process.env.DB_DIALECT || 'postgres',
  dialectOptions: process.env.DB_DIALECT_OPTIONS
                    ? JSON.parse(process.env.DB_DIALECT_OPTIONS)
                    : null,
};

export const production = {
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PWD || null,
  database: process.env.DB_NAME || 'speakerbox',
  host: process.env.DB_HOST || '127.0.0.1',
  dialect: process.env.DB_DIALECT || 'postgres',
  dialectOptions: process.env.DB_DIALECT_OPTIONS
                    ? JSON.parse(process.env.DB_DIALECT_OPTIONS)
                    : { ssl: true },
};

development.url = process.env.DATABASE_URL || url(development);
test.url = process.env.DATABASE_URL || url(test);
production.url = process.env.DATABASE_URL || url(production);
