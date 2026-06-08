import pgPromise from 'pg-promise';

const pgp = pgPromise({
  // Custom promise implementation
  promiseLib: Promise,
});

const connection = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'GoSchool',
  user: process.env.DB_USER || 'GoSchool_user',
  password: process.env.DB_PASSWORD || 'password',
};

export const db = pgp(connection);

// Perform db instance initialization, if needed
db.connect()
  .then((obj: any) => {
    console.log('Database connected successfully');
    obj.done(); // success
  })
  .catch((error: any) => {
    console.error('Database connection failed:', error);
  });
