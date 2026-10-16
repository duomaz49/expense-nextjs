import {test,expect} from './fixtures';
test('month/year/all-time drive every dashboard section',async({page,api})=>{
  await page.goto('/en/dashboard');
  for(const [label,period,heading] of [['This month','month','This month · daily'],['This year','year','This year · monthly'],['All time','all','All time · monthly']]) {
    await page.getByRole('button',{name:label,exact:true}).click();
    await expect(page.getByText(heading,{exact:true})).toBeVisible();
    await expect(page.getByText(`By category · ${label}`,{exact:true})).toBeVisible();
    await expect(page.getByRole('button',{name:label,exact:true})).toHaveAttribute('aria-pressed','true');
    expect(api.calls.some(c=>c.name==='dashboard.getSummary'&&(c.input as {period:string}).period===period)).toBe(true);
  }
  await expect(page.locator('body')).not.toContainText('% vs last');
  await expect(page.getByRole('combobox',{name:'Language'})).toBeVisible();
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});
test('dashboard errors offer retry without hiding the period controls',async({page,api})=>{
  api.failures.add('dashboard.getSummary');
  await page.goto('/en/dashboard');
  await expect(page.getByRole('alert').filter({hasText:'Could not load'})).toBeVisible({timeout:15000});
  await expect(page.getByRole('button',{name:'All time',exact:true})).toBeVisible();
  api.failures.clear();
  await page.getByRole('button',{name:'Try again'}).click();
  await expect(page.getByText('This month · daily',{exact:true})).toBeVisible();
});
test('signed-out users are redirected away from the dashboard',async({page,api})=>{
  api.signedIn=false;
  await page.goto('/en/dashboard');
  await expect(page).toHaveURL(/auth\/sign-in/);
});
