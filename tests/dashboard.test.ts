import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { after, before, mock, test } from 'node:test';
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import { db } from '../src/db';
import { dashboardRouter } from '../src/server/routers/dashboard';
import type { Context } from '../src/server/context';

// Use only a disposable database: this suite creates its own tables.
const schema = `dashboard_test_${randomUUID().replaceAll('-', '')}`;
const pool = new Pool({ connectionString: process.env.TEST_DATABASE_URL, options: `-c search_path=${schema}` });
const testDb = drizzle(pool);
const userId = '11111111-1111-4111-8111-111111111111';
const otherUserId = '22222222-2222-4222-8222-222222222222';
const categoryId = '33333333-3333-4333-8333-333333333333';
const caller = dashboardRouter.createCaller({ user: { id: userId } } as Context);
const now = new Date();
const year = now.getUTCFullYear();
const month = now.getUTCMonth();
const date = (y: number, m: number, d = 1) => new Date(Date.UTC(y, m, d)).toISOString();
const otherMonth = month === 0 ? 1 : 0;

before(async () => {
  assert.ok(process.env.TEST_DATABASE_URL, 'Set TEST_DATABASE_URL to a disposable PostgreSQL database');
  mock.method(db, 'select', testDb.select.bind(testDb));
  await pool.query(`CREATE SCHEMA ${schema}`);
  await pool.query(`
    CREATE TABLE category (id uuid PRIMARY KEY, name text, user_id uuid);
    CREATE TABLE transaction (date timestamptz, amount numeric, category_id uuid, user_id uuid);
    CREATE TABLE budget (month timestamptz, amount numeric, category_id uuid, user_id uuid);
  `);
  await pool.query('INSERT INTO category VALUES ($1, $2, $3)', [categoryId, 'Food', userId]);
  for (const [when, amount, owner] of [
    [date(year, month, 2), -20, userId],
    [date(year, month, 3), -30, userId],
    [date(year, month, 3), 100, userId],
    [date(year, otherMonth, 2), -70, userId],
    [date(year - 1, 0, 2), -200, userId],
    [date(year - 2, 0, 2), 500, userId],
    [date(year + 1, 0), -10, userId],
    [date(year, month, 2), -9999, otherUserId],
  ]) {
    await pool.query('INSERT INTO transaction VALUES ($1, $2, $3, $4)', [when, amount, categoryId, owner]);
  }
  for (const [when, amount, owner] of [
    [date(year, month), 100, userId],
    [date(year, otherMonth), 150, userId],
    [date(year - 1, 0), 300, userId],
    [date(year, month), 9999, otherUserId],
  ]) {
    await pool.query('INSERT INTO budget VALUES ($1, $2, $3, $4)', [when, amount, categoryId, owner]);
  }
});

after(async () => {
  mock.restoreAll();
  if (process.env.TEST_DATABASE_URL) await pool.query(`DROP SCHEMA IF EXISTS ${schema} CASCADE`);
  await pool.end();
});

test('month filters every dataset, groups by day, and keeps income out of category spending', async () => {
  const data = await caller.getSummary({ period: 'month' });
  assert.deepEqual(data.current, { income: 100, spent: 50, net: 50, count: 3 });
  assert.equal(data.monthly.length, 2);
  assert.deepEqual(data.monthly.map(row => row.spent), [20, 30]);
  assert.equal(data.byCategory[0].spent, 50);
  assert.equal(data.byCategory[0].budget, 100);
});

test('year includes all months without multiplying expenses by the number of budgets', async () => {
  const data = await caller.getSummary({ period: 'year' });
  assert.deepEqual(data.current, { income: 100, spent: 120, net: -20, count: 4 });
  assert.deepEqual(data.previous, { income: 0, spent: 200, net: -200, count: 1 });
  assert.equal(data.monthly.length, 2);
  assert.equal(data.monthly.reduce((sum, row) => sum + row.spent, 0), 120);
  assert.equal(data.byCategory[0].spent, 120);
  assert.equal(data.byCategory[0].budget, 250);
});

test('all time includes every year and has no previous-period comparison', async () => {
  const data = await caller.getSummary({ period: 'all' });
  assert.deepEqual(data.current, { income: 600, spent: 330, net: 270, count: 7 });
  assert.equal(data.previous, null);
  assert.equal(data.monthly.length, 5);
  assert.equal(data.byCategory[0].spent, 330);
  assert.equal(data.byCategory[0].budget, 550);
});

test('empty accounts return zero totals and no charts', async () => {
  const empty = dashboardRouter.createCaller({ user: { id: '44444444-4444-4444-8444-444444444444' } } as Context);
  const data = await empty.getSummary({ period: 'all' });
  assert.deepEqual(data.current, { income: 0, spent: 0, net: 0, count: 0 });
  assert.deepEqual(data.monthly, []);
  assert.deepEqual(data.byCategory, []);
});

test('rejects invalid periods and unauthenticated calls', async () => {
  // @ts-expect-error Verify validation at the API boundary.
  await assert.rejects(caller.getSummary({ period: 'invalid' }), { code: 'BAD_REQUEST' });
  await assert.rejects(caller.getSummary({period: 'month', timeZone: 'Invalid/Zone'}), {code: 'BAD_REQUEST'});
  await assert.rejects(dashboardRouter.createCaller({ user: null }).getSummary({ period: 'all' }), { code: 'UNAUTHORIZED' });
});

test('local midnight stays on the correct day and within the selected month', async () => {
  const owner = '55555555-5555-4555-8555-555555555555';
  const localCaller = dashboardRouter.createCaller({ user: { id: owner } } as Context);
  const tokyoNow = new Date(now.getTime() + 9 * 60 * 60 * 1000);
  const localYear = tokyoNow.getUTCFullYear(), localMonth = tokyoNow.getUTCMonth();
  const localMonthStart = new Date(Date.UTC(localYear, localMonth, 1) - 9 * 60 * 60 * 1000);
  const localNextMonth = new Date(Date.UTC(localYear, localMonth + 1, 1) - 9 * 60 * 60 * 1000);
  for (const [when, amount] of [
    [new Date(localMonthStart.getTime() - 1), -999],
    [localMonthStart, -25],
    [new Date(localNextMonth.getTime() - 1), -75],
    [localNextMonth, -999],
  ]) {
    await pool.query('INSERT INTO transaction VALUES ($1, $2, NULL, $3)', [when, amount, owner]);
  }
  const data = await localCaller.getSummary({ period: 'month', timeZone: 'Asia/Tokyo' });
  assert.equal(data.current.spent, 100);
  assert.equal(data.current.count, 2);
  assert.equal(data.monthly[0].month, date(localYear, localMonth).slice(0, 10));
  assert.equal(data.monthly[1].month, date(localYear, localMonth + 1, 0).slice(0, 10));
});

test('budgets use UTC calendar keys even when the viewer is west of UTC', async () => {
  const owner = randomUUID(), category = randomUUID();
  const localCaller = dashboardRouter.createCaller({user: {id:owner}} as Context);
  const parts = new Intl.DateTimeFormat('en', {timeZone:'America/New_York',year:'numeric',month:'numeric'}).formatToParts(now);
  const y = Number(parts.find(p=>p.type==='year')!.value), m = Number(parts.find(p=>p.type==='month')!.value)-1;
  await pool.query('INSERT INTO category VALUES ($1,$2,$3)',[category,'Local budget',owner]);
  for(const [when,amount] of [[date(y,m),100],[date(y,m+1),900],[date(y,0),250],[date(y+1,0),5000]]) {
    await pool.query('INSERT INTO budget VALUES ($1,$2,$3,$4)',[when,amount,category,owner]);
  }
  const monthly = await localCaller.getSummary({period:'month',timeZone:'America/New_York'});
  assert.equal(monthly.byCategory[0].budget,100+(m===0?250:0));
  const yearly = await localCaller.getSummary({period:'year',timeZone:'America/New_York'});
  assert.equal(yearly.byCategory[0].budget,350+(m===11?0:900));
});
