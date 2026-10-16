import {test,expect} from './fixtures';

for (const path of ['/en', '/en/dashboard']) test(`language menu opens below its selector on ${path}`, async ({page}) => {
  await page.goto(path);
  const trigger = page.getByRole('combobox', {name: 'Language'});
  const triggerBounds = (await trigger.boundingBox())!;
  await trigger.click();
  const menu = page.getByRole('listbox');
  await expect(menu).toBeVisible();
  await expect.poll(async () => (await menu.boundingBox())!.y).toBeGreaterThanOrEqual(triggerBounds.y + triggerBounds.height);
  await expect.poll(async () => {
    const bounds = (await menu.boundingBox())!;
    return Math.abs(bounds.x + bounds.width - triggerBounds.x - triggerBounds.width);
  }).toBeLessThanOrEqual(1);
});

for(const locale of ['en','fi']) test(`${locale} landing has valid document, truthful features, and no auth background`,async({page})=>{
  const errors:string[]=[]; const requests:string[]=[];
  page.on('pageerror', e=>errors.push(e.message)); page.on('request',r=>requests.push(r.url()));
  const response=await page.goto(`/${locale}`);
  expect(response?.status()).toBe(200);
  await expect(page.locator('html')).toHaveAttribute('lang',locale);
  await expect(page.getByRole('combobox',{name:locale==='en'?'Language':'Kieli'})).toBeVisible();
  await expect(page.getByText(locale==='en'?'Nordea CSV import':'Nordean CSV-tuonti',{exact:true})).toBeVisible();
  await expect(page.locator('body')).not.toContainText(locale==='en'?'Join thousands':'Liity tuhansiin');
  expect(requests.some(url=>url.includes('/bg_home.jpg')||url.includes('/api/auth/'))).toBe(false);
  expect(errors).toEqual([]);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});
test('language switch keeps query parameters and anchor',async({page})=>{
  await page.goto('/en?source=test#features');
  await page.getByRole('combobox',{name:'Language'}).click();
  await page.getByRole('option',{name:'Suomi'}).click();
  await expect(page).toHaveURL(/\/fi\?source=test#features$/);
  await expect(page.locator('html')).toHaveAttribute('lang','fi');
  await page.getByRole('combobox',{name:'Kieli'}).click();
  await page.getByRole('option',{name:'English'}).click();
  await expect(page).toHaveURL(/\/en\?source=test#features$/);
});
test('root redirects to a supported locale',async({page})=>{
  await page.goto('/');
  await expect(page).toHaveURL(/\/(en|fi)$/);
  await expect(page.locator('html')).toHaveCount(1);
  await expect(page.locator('body')).toHaveCount(1);
});
for(const path of ['/missing-file.txt','/en/does-not-exist']) test(`unknown route ${path} renders a complete 404 document`,async({page})=>{
  const response=await page.goto(path);
  expect(response?.status()).toBe(404);
  await expect(page.locator('body')).toContainText('404');
  await expect(page.getByText('Missing <html>')).toHaveCount(0);
});
