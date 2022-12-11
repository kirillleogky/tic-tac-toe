import knex from 'knex';
import dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const { PG_HOST, PG_DATABASE, PG_USER, PG_PASSWORD, PG_PORT } = process.env;
export const knexClient = knex({
  client: 'pg',
  connection: {
    host: PG_HOST,
    port: Number(PG_PORT) || 5432,
    user: PG_USER,
    password: PG_PASSWORD,
    database: PG_DATABASE,
    ssl: true,
  },
});
