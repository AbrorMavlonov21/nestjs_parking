import { Pool, PoolClient } from 'pg';
import { config } from '../config/index';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const pool = new Pool({
  connectionString: config.DB_URL,
});

export abstract class BaseRepository {
  protected async single<TData, TArg>(
    SQL: string,
    ...args: Array<TArg>
  ): Promise<TData | undefined> {
    const client: PoolClient = await pool.connect();

    try {
      const {
        rows: [row],
      } = await client.query(SQL, args);

      return row;
    } finally {
      client.release();
    }
  }

  protected async multiple<TData, TArg>(
    SQL: string,
    ...args: Array<TArg>
  ): Promise<Array<TData>> {
    const client: PoolClient = await pool.connect();

    try {
      const { rows } = await client.query(SQL, args);

      return rows;
    } finally {
      client.release();
    }
  }
}
