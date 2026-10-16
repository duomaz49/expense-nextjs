import { test as base, expect } from '@playwright/test';
import { randomUUID } from 'node:crypto';

const userId = '11111111-1111-4111-8111-111111111111';
export const categoryId = '33333333-3333-4333-8333-333333333333';
const date = new Date().toISOString();
type Transaction = {id: string; date: string; amount: string; description: string; categoryId: string | null};
type Category = {id: string; name: string};
type Budget = {id: string; categoryId: string; month: string; amount: string};
type Input = Partial<Transaction & Category & Budget> & {period?: string; rows?: Omit<Transaction, 'id'>[]};
type ApiState = {signedIn: boolean; categories: Category[]; transactions: Transaction[]; budgets: Budget[]; calls: {name: string; input: unknown}[]; failures: Set<string>};

export const test = base.extend<{ api: ApiState }>({
  api: [async ({page}, use) => {
    const state: ApiState = {
      signedIn: true,
      categories: [{id: categoryId, name: 'Food'}],
      transactions: [{id: randomUUID(), date, amount: '-12.34', description: 'Lunch', categoryId}],
      budgets: [], calls: [], failures: new Set(),
    };
    await page.route('**/api/auth/**', route => route.fulfill({json: route.request().url().includes('get-session') ? (state.signedIn ? {
      user: {id:userId,name:'Test User',email:'test@example.test',emailVerified:true,createdAt:date,updatedAt:date},
      session: {id:'test-session',userId,token:'test-token',expiresAt:new Date(Date.now()+86400000).toISOString()},
    } : null) : []}));
    await page.route('**/api/trpc/**', async route => {
      const url = new URL(route.request().url());
      const names = decodeURIComponent(url.pathname.split('/api/trpc/')[1]).split(',');
      const inputs = (route.request().postDataJSON() ?? JSON.parse(url.searchParams.get('input') ?? '{}')) as Record<string, Input | string>;
      const results = names.map((name, index) => {
        const raw = inputs[index]; const input = (typeof raw === 'object' ? raw : {}) as Input;
        state.calls.push({name,input:raw});
        if(state.failures.has(name)) return {error:{message:'Test failure',code:-32603,data:{code:'INTERNAL_SERVER_ERROR',httpStatus:500,path:name}}};
        let data: unknown = null;
        switch(name) {
          case 'transaction.getAll': data=state.transactions.map(t=>({...t,userId,createdAt:date,updatedAt:date,categoryName:state.categories.find(c=>c.id===t.categoryId)?.name??null})); break;
          case 'transaction.add': state.transactions.push({id:randomUUID(),date:input.date!,amount:input.amount!,description:input.description!,categoryId:input.categoryId??null}); break;
          case 'transaction.addMany': state.transactions.push(...input.rows!.map(row=>({...row,id:randomUUID(),categoryId:row.categoryId??null}))); break;
          case 'transaction.edit': state.transactions=state.transactions.map(t=>t.id===input.id?{...t,...input} as Transaction:t); break;
          case 'transaction.delete': state.transactions=state.transactions.filter(t=>t.id!==raw); break;
          case 'category.getAll': data=state.categories.map(c=>({...c,userId,createdAt:date,updatedAt:date})); break;
          case 'category.getOverview': data=state.categories.map(c=>({...c,budget:null,spent:'12.34',txnCount:1})); break;
          case 'category.add': {const c={id:randomUUID(),name:input.name!};state.categories.push(c);data=c;break;}
          case 'category.edit': state.categories=state.categories.map(c=>c.id===input.id?{...c,name:input.name!}:c); break;
          case 'category.delete': state.categories=state.categories.filter(c=>c.id!==raw); break;
          case 'budget.getAll': data=state.budgets; break;
          case 'budget.getOverview': data=state.categories.map(c=>{const b=state.budgets.find(b=>b.categoryId===c.id&&b.month===input.month);return {categoryId:c.id,categoryName:c.name,budgetId:b?.id??null,budgetAmount:b?.amount??null,spent:'12.34'};});break;
          case 'budget.add': state.budgets.push({id:randomUUID(),categoryId:input.categoryId!,month:input.month!,amount:input.amount!});break;
          case 'budget.edit': state.budgets=state.budgets.map(b=>b.id===input.id?{...b,amount:input.amount!}:b);break;
          case 'budget.delete': state.budgets=state.budgets.filter(b=>b.id!==raw);break;
          case 'dashboard.getSummary': {
            const spent=input.period==='all'?330:input.period==='year'?120:50;
            data={current:{income:600,spent,net:600-spent,count:7},previous:input.period==='all'?null:{income:100,spent:20,net:80,count:2},monthly:[{month:date.slice(0,10),income:600,spent,count:7}],byCategory:[{categoryId,categoryName:'Food',spent,budget:550}]};break;
          }
          default: throw new Error(`Unmocked API procedure: ${name}`);
        }
        return {result:{data}};
      });
      await route.fulfill({json:results});
    });
    await use(state);
  }, {auto:true}],
});
export {expect};
