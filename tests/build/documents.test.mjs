import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { test } from 'node:test';

for (const route of ['en', 'fi', '_not-found']) {
  test(`built ${route} page has a complete document`, async () => {
    const html = await readFile(`.next/server/app/${route}.html`, 'utf8');
    assert.equal((html.match(/<html[\s>]/g) ?? []).length, 1);
    assert.equal((html.match(/<body[\s>]/g) ?? []).length, 1);
    assert.ok(html.includes('</body>') && html.includes('</html>'));
    if (route !== '_not-found') {
      assert.ok(html.includes(`lang="${route}"`));
      assert.ok(html.includes('role="combobox"'));
      assert.ok(!html.includes('class="neon-auth-ui"'));
    } else assert.ok(html.includes('404'));
  });
}
