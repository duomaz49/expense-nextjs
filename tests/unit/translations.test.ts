import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createTranslator } from 'next-intl';
import en from '../../src/messages/en.json';
import fi from '../../src/messages/fi.json';
const flatten = (value: object, prefix = ''): Record<string, string> => Object.fromEntries(Object.entries(value).flatMap(([key, val]) => typeof val === 'string' ? [[`${prefix}${key}`, val]] : Object.entries(flatten(val, `${prefix}${key}.`))));
test('Finnish and English have matching nonempty translation keys', () => {
  const english = flatten(en); const finnish = flatten(fi);
  assert.deepEqual(Object.keys(english).sort(), Object.keys(finnish).sort());
  for (const value of [...Object.values(english), ...Object.values(finnish)]) assert.ok(value.trim());
});
for (const [locale, messages] of Object.entries({en, fi})) {
  test(`${locale} interpolates counts and renders singular/plural messages`, () => {
    const t = createTranslator({locale, messages});
    assert.ok(t('transactions.import.previewRows', {count: 7}).includes('7'));
    assert.ok(t('categories.card.transactionCount', {count: 1}).includes('1'));
    assert.ok(t('categories.card.transactionCount', {count: 2}).includes('2'));
    assert.ok(t('categories.deleteConfirm.title', {name: 'Food'}).includes('Food'));
  });
}
