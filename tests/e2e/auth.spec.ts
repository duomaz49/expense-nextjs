import {test, expect} from './fixtures';

test('Google sign-in sends the dashboard callback through the same-origin auth API', async ({page, api}) => {
  api.signedIn = false;
  let signIn: {provider: string; callbackURL: string} | undefined;
  await page.route('**/api/auth/sign-in/social', async route => {
    signIn = route.request().postDataJSON();
    await route.fulfill({json: {url: 'https://example.test/oauth', redirect: false}});
  });
  await page.goto('/en/auth/sign-in');
  await page.getByRole('button', {name: /Google/}).click();
  await expect.poll(() => signIn?.provider).toBe('google');
  const callback = new URL(signIn!.callbackURL, page.url());
  expect(callback.origin).toBe(new URL(page.url()).origin);
  expect(callback.pathname).toBe('/dashboard');
});

test('locale redirect preserves the OAuth verifier until the session exchange', async ({page}) => {
  const sessionRequest = page.waitForRequest(request => {
    const url = new URL(request.url());
    return url.pathname === '/api/auth/get-session'
      && url.searchParams.get('neon_auth_session_verifier') === 'test-verifier';
  });
  await page.goto('/dashboard?neon_auth_session_verifier=test-verifier');
  await sessionRequest;
  await expect(page.getByRole('button', {name: 'All time', exact: true})).toBeVisible();
  await expect(page).toHaveURL(/\/en\/dashboard$/);
});
