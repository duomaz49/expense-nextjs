import assert from 'node:assert/strict';
import { test } from 'node:test';
import { formatCurrency, formatDate, formatMonthShort, formatMonthYear } from '../../src/lib/formatters';

for (const locale of ['en', 'fi']) {
  for (const amount of [0, 12.34, -1234.56, 0.005]) {
    test(`${locale} formats EUR ${amount}`, () => {
      assert.equal(formatCurrency(amount, locale), new Intl.NumberFormat(locale, { style: 'currency', currency: 'EUR' }).format(amount));
    });
  }
  test(`${locale} accepts both Date and ISO date input`, () => {
    const date = new Date(2024, 1, 29, 12);
    assert.equal(formatDate(date, locale), formatDate(date.toISOString(), locale));
    assert.equal(formatMonthYear(date, locale), date.toLocaleString(locale, { month: 'long', year: 'numeric' }));
    assert.equal(formatMonthShort(date, locale), date.toLocaleString(locale, { month: 'short' }));
  });
}
