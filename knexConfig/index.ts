import knex from 'knex';
import dotenv from 'dotenv';

import { DEFAULT_KNEX_PORT } from '../src/constants';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const { PG_HOST, PG_DATABASE, PG_USER, PG_PASSWORD, PG_PORT } = process.env;
export const knexClient = knex({
  client: 'pg',
  connection: {
    host: PG_HOST,
    port: Number(PG_PORT) || DEFAULT_KNEX_PORT,
    user: PG_USER,
    password: PG_PASSWORD,
    database: PG_DATABASE,
    ssl: true,
  },
});
