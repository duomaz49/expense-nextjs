import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { after, before, mock } from 'node:test';
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import { db } from '../../src/db';

export function setupTestDatabase() {
  const schema = `test_${randomUUID().replaceAll('-', '')}`;
  const pool = new Pool({ connectionString: process.env.TEST_DATABASE_URL, options: `-c search_path=${schema}` });
  const database = drizzle(pool);
  before(async () => {
    assert.ok(process.env.TEST_DATABASE_URL, 'Set TEST_DATABASE_URL to a disposable PostgreSQL database');
    for (const method of ['select', 'insert', 'update', 'delete'] as const) {
      mock.method(db, method, database[method].bind(database));
    }
    mock.method(db, 'batch', async (queries: { getSQL: () => import('drizzle-orm').SQL }[]) =>
      database.transaction(async tx => {
        const results = [];
        for (const query of queries) results.push(await tx.execute(query.getSQL()));
        return results;
      }));
    await pool.query(`CREATE SCHEMA ${schema}`);
    await pool.query(`
      CREATE TABLE category (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(), name text NOT NULL, user_id uuid NOT NULL,
        "createdAt" timestamptz NOT NULL DEFAULT now(), "updatedAt" timestamptz NOT NULL DEFAULT now()
      );
      CREATE TABLE transaction (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(), date timestamptz NOT NULL, amount numeric NOT NULL,
        description text, category_id uuid REFERENCES category(id), user_id uuid NOT NULL,
        "createdAt" timestamptz NOT NULL DEFAULT now(), "updatedAt" timestamptz NOT NULL DEFAULT now()
      );
      CREATE TABLE budget (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(), month timestamptz NOT NULL, amount numeric NOT NULL,
        category_id uuid NOT NULL REFERENCES category(id) ON DELETE CASCADE, user_id uuid NOT NULL,
        "createdAt" timestamptz NOT NULL DEFAULT now(), "updatedAt" timestamptz NOT NULL DEFAULT now(),
        UNIQUE (user_id, category_id, month)
      );
    `);
  });
  after(async () => {
    mock.restoreAll();
    try { if (process.env.TEST_DATABASE_URL) await pool.query(`DROP SCHEMA IF EXISTS ${schema} CASCADE`); }
    finally { await pool.end(); }
  });
  return pool;
}
