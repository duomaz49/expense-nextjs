import assert from 'node:assert/strict';
import { beforeEach, test } from 'node:test';
import { appRouter } from '../../src/server/routers/_app';
import type { Context } from '../../src/server/context';
import { setupTestDatabase } from '../helpers/database';

const pool = setupTestDatabase();
const user = '11111111-1111-4111-8111-111111111111';
const other = '22222222-2222-4222-8222-222222222222';
const ownCategory = '33333333-3333-4333-8333-333333333333';
const otherCategory = '44444444-4444-4444-8444-444444444444';
const caller = appRouter.createCaller({user: {id: user}} as Context);
const stranger = appRouter.createCaller({user: {id: other}} as Context);
const anonymous = appRouter.createCaller({user: null});
const now = new Date();
const month = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1)).toISOString();
const date = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 15, 12)).toISOString();
const entry = {date, amount: '-12.34', description: 'Lunch', categoryId: ownCategory};
const limit = {month, amount: '100', categoryId: ownCategory};

beforeEach(async () => {
  await pool.query('TRUNCATE transaction, budget, category CASCADE');
  await pool.query('INSERT INTO category(id,name,user_id) VALUES ($1,$2,$3),($4,$5,$6)', [ownCategory,'Food',user,otherCategory,'Private',other]);
});

const protectedCalls = [
  ['transaction list', () => anonymous.transaction.getAll()],
  ['transaction add', () => anonymous.transaction.add(entry)],
  ['transaction import', () => anonymous.transaction.addMany({rows:[entry]})],
  ['transaction edit', () => anonymous.transaction.edit({...entry,id:ownCategory})],
  ['transaction delete', () => anonymous.transaction.delete(ownCategory)],
  ['category list', () => anonymous.category.getAll()],
  ['category overview', () => anonymous.category.getOverview()],
  ['category add', () => anonymous.category.add({name:'Food'})],
  ['category edit', () => anonymous.category.edit({id:ownCategory,name:'Food'})],
  ['category delete', () => anonymous.category.delete(ownCategory)],
  ['budget list', () => anonymous.budget.getAll()],
  ['budget overview', () => anonymous.budget.getOverview({month})],
  ['budget add', () => anonymous.budget.add(limit)],
  ['budget edit', () => anonymous.budget.edit({...limit,id:ownCategory})],
  ['budget delete', () => anonymous.budget.delete(ownCategory)],
  ['dashboard', () => anonymous.dashboard.getSummary({period:'all'})],
] as const;
for (const [name, invoke] of protectedCalls) test(`${name} requires authentication`, async () => {
  await assert.rejects(invoke(), {code:'UNAUTHORIZED'});
});

test('transaction create, read, edit, and delete preserve decimal amounts and ownership', async () => {
  await caller.transaction.add(entry);
  const [row] = await caller.transaction.getAll();
  assert.equal(row.amount, '-12.34'); assert.equal(row.categoryName, 'Food'); assert.equal(row.userId,user);
  assert.deepEqual(await stranger.transaction.getAll(),[]);
  await caller.transaction.edit({...entry,id:row.id,amount:'-20.50'});
  assert.equal((await caller.transaction.getAll())[0].amount,'-20.50');
  await stranger.transaction.delete(row.id);
  await stranger.transaction.edit({...entry,id:row.id,categoryId:otherCategory,amount:'-900'});
  assert.equal((await caller.transaction.getAll())[0].amount,'-20.50');
  await caller.transaction.delete(row.id);
  assert.deepEqual(await caller.transaction.getAll(),[]);
});
test('transactions can be recorded without a category and cleared when editing', async () => {
  await caller.transaction.add({...entry,categoryId:undefined});
  const [row] = await caller.transaction.getAll();
  assert.equal(row.categoryId,null);
  await caller.transaction.edit({...entry,id:row.id});
  await caller.transaction.edit({...entry,id:row.id,categoryId:undefined});
  assert.equal((await caller.transaction.getAll())[0].categoryId,null);
});
test('bulk import saves all rows with the current user', async () => {
  await caller.transaction.addMany({rows:[entry,{...entry,amount:'200',categoryId:undefined}]});
  const rows = await caller.transaction.getAll();
  assert.equal(rows.length,2); assert.ok(rows.every(r=>r.userId===user));
});
test('invalid import fails atomically without saving valid rows', async () => {
  await assert.rejects(caller.transaction.addMany({rows:[entry,{...entry,date:'invalid'}]}),{code:'BAD_REQUEST'});
  assert.deepEqual(await caller.transaction.getAll(),[]);
  await assert.rejects(caller.transaction.addMany({rows:[]}),{code:'BAD_REQUEST'});
});
for (const amount of ['NaN','Infinity','abc','', '1,25']) test(`transaction rejects invalid amount ${JSON.stringify(amount)}`, async () => {
  await assert.rejects(caller.transaction.add({...entry,amount}),{code:'BAD_REQUEST'});
});
test('transaction mutations cannot reference another user’s category', async () => {
  await assert.rejects(caller.transaction.add({...entry,categoryId:otherCategory}),{code:'NOT_FOUND'});
  await assert.rejects(caller.transaction.addMany({rows:[entry,{...entry,categoryId:otherCategory}]}),{code:'NOT_FOUND'});
  assert.deepEqual(await caller.transaction.getAll(),[]);
  await caller.transaction.add(entry);
  const [row] = await caller.transaction.getAll();
  await assert.rejects(caller.transaction.edit({...entry,id:row.id,categoryId:otherCategory}),{code:'NOT_FOUND'});
});
test('legacy cross-account category links do not expose category names or affect another account’s totals', async () => {
  await pool.query('INSERT INTO transaction(date,amount,description,category_id,user_id) VALUES ($1,$2,$3,$4,$5)',
    [date,'-99','Legacy entry',otherCategory,user]);
  const [row] = await caller.transaction.getAll();
  assert.equal(row.description,'Legacy entry');
  assert.equal(row.categoryName,null);
  assert.deepEqual(await stranger.transaction.getAll(),[]);
  const [overview] = await stranger.category.getOverview();
  assert.equal(Number(overview.spent),0);
  assert.equal(overview.txnCount,0);
  assert.equal(Number((await stranger.budget.getOverview({month}))[0].spent),0);
  assert.equal((await stranger.dashboard.getSummary({period:'all'})).current.spent,0);
});
test('categories can be created and renamed and cannot be changed by another account', async () => {
  const row=await caller.category.add({name:'Travel'});
  assert.equal(row.userId,user);
  await stranger.category.edit({id:row.id,name:'Stolen'});
  await stranger.category.delete(row.id);
  assert.equal((await caller.category.getAll()).find(r=>r.id===row.id)?.name,'Travel');
  await caller.category.edit({id:row.id,name:'Trips'});
  assert.equal((await caller.category.getAll()).find(r=>r.id===row.id)?.name,'Trips');
  assert.equal((await stranger.category.getAll()).length,1);
});
test('empty category names are rejected on create and edit', async () => {
  await assert.rejects(caller.category.add({name:'  '}),{code:'BAD_REQUEST'});
  await assert.rejects(caller.category.edit({id:ownCategory,name:''}),{code:'BAD_REQUEST'});
});
test('deleting a category preserves transactions and removes its budgets', async () => {
  await caller.transaction.add(entry); await caller.budget.add(limit);
  await caller.category.delete(ownCategory);
  const [row]=await caller.transaction.getAll();
  assert.equal(row.amount,'-12.34'); assert.equal(row.categoryId,null);
  assert.deepEqual(await caller.budget.getAll(),[]);
});
test('budgets support create/read/edit/delete and enforce account ownership', async () => {
  await caller.budget.add(limit);
  const [row]=await caller.budget.getAll();
  assert.equal(row.amount,'100'); assert.deepEqual(await stranger.budget.getAll(),[]);
  await stranger.budget.edit({...limit,id:row.id,categoryId:otherCategory,amount:'900'});
  await stranger.budget.delete(row.id);
  assert.equal((await caller.budget.getAll())[0].amount,'100');
  await caller.budget.edit({...limit,id:row.id,amount:'250'});
  assert.equal((await caller.budget.getAll())[0].amount,'250');
  await caller.budget.delete(row.id);
  assert.deepEqual(await caller.budget.getAll(),[]);
});
test('duplicate budgets do not overwrite an existing category/month budget', async () => {
  await caller.budget.add(limit);
  await assert.rejects(caller.budget.add({...limit,amount:'900'}));
  assert.equal((await caller.budget.getAll())[0].amount,'100');
});
test('budget mutations reject foreign categories and negative or invalid amounts', async () => {
  await assert.rejects(caller.budget.add({...limit,categoryId:otherCategory}),{code:'NOT_FOUND'});
  for(const amount of ['-1','NaN','Infinity','']) await assert.rejects(caller.budget.add({...limit,amount}),{code:'BAD_REQUEST'});
});
test('category and budget overviews count expenses without subtracting income', async () => {
  await caller.transaction.add(entry); await caller.transaction.add({...entry,amount:'100'}); await caller.budget.add(limit);
  const [category]=await caller.category.getOverview();
  assert.equal(Number(category.spent),12.34); assert.equal(category.txnCount,2);
  const [budget]=await caller.budget.getOverview({month});
  assert.equal(Number(budget.spent),12.34); assert.equal(budget.budgetAmount,'100');
});
test('overviews exclude other months and return categories without budgets', async () => {
  await caller.transaction.add({...entry,date:new Date(Date.UTC(now.getUTCFullYear(),now.getUTCMonth()-1,15)).toISOString()});
  const [row]=await caller.budget.getOverview({month});
  assert.equal(Number(row.spent),0); assert.equal(row.budgetAmount,null);
});
test('invalid identifiers and dates fail before database access', async () => {
  await assert.rejects(caller.transaction.delete('bad'),{code:'BAD_REQUEST'});
  await assert.rejects(caller.category.delete('bad'),{code:'BAD_REQUEST'});
  await assert.rejects(caller.budget.delete('bad'),{code:'BAD_REQUEST'});
  await assert.rejects(caller.budget.getOverview({month:'bad'}),{code:'BAD_REQUEST'});
});
