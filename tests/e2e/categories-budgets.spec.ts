import {test,expect} from './fixtures';
test('budget month picker jumps to a month and keeps navigation and new budgets in sync', async ({page,api}) => {
  await page.goto('/en/budgets');
  const picker = page.getByLabel('Budget month', {exact:true});
  await expect(picker).toHaveAttribute('type','month');
  await picker.fill('2025-12');
  await expect.poll(() => (api.calls.filter(c=>c.name==='budget.getOverview').at(-1)?.input as {month:string})?.month).toBe('2025-12-01T00:00:00.000Z');
  await page.getByRole('link',{name:'Go to next page'}).click();
  await expect(picker).toHaveValue('2026-01');
  await expect.poll(() => (api.calls.filter(c=>c.name==='budget.getOverview').at(-1)?.input as {month:string})?.month).toBe('2026-01-01T00:00:00.000Z');
  await page.getByRole('button',{name:'Set budget',exact:true}).click();
  await page.getByRole('dialog').getByLabel('Amount',{exact:true}).fill('300');
  await page.getByRole('dialog').getByRole('button',{name:'Create',exact:true}).click();
  await expect(page.getByRole('dialog')).toHaveCount(0);
  expect(api.budgets[0].month).toBe('2026-01-01T00:00:00.000Z');
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});
test('category create dialog saves a new category',async({page,api})=>{
  await page.goto('/en/categories');
  await page.getByRole('button',{name:'New Category',exact:true}).click();
  await page.getByRole('dialog').getByLabel('Name',{exact:true}).fill('Travel');
  await page.getByRole('dialog').getByRole('button',{name:'Create',exact:true}).click();
  await expect(page.getByText('Travel',{exact:true})).toBeVisible();
  expect(api.categories.some(c=>c.name==='Travel')).toBe(true);
});
test('empty categories explain how to start',async({page,api})=>{
  api.categories=[]; await page.goto('/en/categories');
  await expect(page.getByText('No categories yet. Create one to start tracking.',{exact:true})).toBeVisible();
});
test('monthly budget can be set for a category',async({page,api})=>{
  await page.goto('/en/budgets');
  await page.getByRole('button',{name:'Set budget',exact:true}).click();
  await page.getByRole('dialog').getByLabel('Amount',{exact:true}).fill('300');
  await page.getByRole('dialog').getByRole('button',{name:'Create',exact:true}).click();
  await expect(page.getByRole('dialog')).toHaveCount(0);
  expect(api.budgets[0].amount).toBe('300');
});
test('budget month navigation requests a different month',async({page,api})=>{
  await page.goto('/en/budgets');
  await expect(page.getByText('Food',{exact:true})).toBeVisible();
  const original=(api.calls.find(c=>c.name==='budget.getOverview')?.input as {month:string}).month;
  await page.getByRole('link',{name:'Go to next page'}).click();
  await expect.poll(()=>api.calls.filter(c=>c.name==='budget.getOverview').length).toBe(2);
  expect((api.calls.filter(c=>c.name==='budget.getOverview')[1].input as {month:string}).month).not.toBe(original);
});
