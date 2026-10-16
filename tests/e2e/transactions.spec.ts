import {test,expect} from './fixtures';
test('transaction form saves a negative expense and refreshes the table',async({page,api})=>{
  await page.goto('/en/transactions');
  await page.getByRole('button',{name:'New Transaction',exact:true}).click();
  const dialog=page.getByRole('dialog');
  await dialog.getByLabel('Date',{exact:true}).fill('2026-10-16T12:00');
  await dialog.getByLabel('Amount',{exact:true}).fill('15.50');
  await dialog.getByLabel('Description',{exact:true}).fill('Test coffee');
  await dialog.getByRole('button',{name:'Save',exact:true}).click();
  await expect(page.getByRole('cell',{name:'Test coffee',exact:true})).toBeVisible();
  expect(api.transactions.find(t=>t.description==='Test coffee')?.amount).toBe('-15.5');
  expect((api.calls.find(c=>c.name==='transaction.add')?.input as {categoryId?:string}).categoryId).toBeUndefined();
});
test('CSV import previews rows before saving',async({page,api})=>{
  await page.goto('/en/transactions');
  await page.getByRole('button',{name:'New Transaction',exact:true}).click();
  await page.getByRole('tab',{name:'Import Transactions',exact:true}).click();
  await page.getByLabel('CSV File').setInputFiles({name:'nordea.csv',mimeType:'text/csv',buffer:Buffer.from('Booking date;Amount;Title\n2026/10/16;-9,90;Test CSV lunch\n')});
  await page.getByRole('button',{name:'Preview',exact:true}).click();
  await expect(page.getByRole('dialog')).toContainText('Test CSV lunch');
  expect(api.calls.some(c=>c.name==='transaction.addMany')).toBe(false);
  await page.getByRole('button',{name:'Import',exact:true}).click();
  await expect(page.getByRole('cell',{name:'Test CSV lunch',exact:true})).toBeVisible();
  expect(api.transactions.find(t=>t.description==='Test CSV lunch')?.amount).toBe('-9.90');
});
test('empty transaction list has a useful empty state',async({page,api})=>{
  api.transactions=[]; await page.goto('/en/transactions');
  await expect(page.getByText('No transactions found.',{exact:true})).toBeVisible();
});
test('date filters can be applied and reset',async({page})=>{
  await page.goto('/en/transactions');
  await page.getByRole('button',{name:'Filters'}).click();
  await page.locator('input[type=date]').first().fill('2099-01-01');
  await expect(page.getByText('No transactions found.',{exact:true})).toBeVisible();
  await page.getByRole('button',{name:'Reset',exact:true}).click();
  await expect(page.getByRole('cell',{name:'Lunch',exact:true})).toBeVisible();
});
