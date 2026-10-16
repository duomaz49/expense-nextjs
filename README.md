# OpenFinance

A full-stack personal finance app for tracking expenses, monitoring spending habits,
and understanding your finances through dashboards and visual analytics.

Built with secure authentication, PostgreSQL, and a responsive interface in English
and Finnish.

## Features

- Add, edit, delete, and categorize income and expenses. Amounts are displayed in EUR.
- Filter transactions by date and category, sort columns, and paginate the table.
- Preview and import supported Nordea CSV exports.
- Create and rename categories. Deleting a category preserves its transactions and
  removes its budgets.
- Set monthly category budgets and compare them with actual expenses.
  Choose a month and year with the calendar picker or step through months with the arrows.
- Switch the dashboard between **This month**, **This year**, and **All time**.
  The same period applies to totals, charts, categories, and budget comparisons.
  Monthly views use daily bars; year and all-time views use monthly bars.
- Switch between English and Finnish from the landing page and app headers.

The app does not connect to bank accounts, categorize transactions automatically,
or manage separate financial accounts. CSV import supports Nordea's format, not
arbitrary bank exports. All-time totals include every recorded transaction; there
is no previous-period percentage comparison for that view.

## Stack

Next.js 16 App Router, React 19, TypeScript, tRPC, TanStack Query/Table, Drizzle ORM,
Neon PostgreSQL and Neon Auth, next-intl, Tailwind CSS 4, shadcn/ui, Recharts, and Zustand.

## Local setup

Requirements: Node.js 20.9 or newer, npm, and a Neon project with PostgreSQL and
Neon Auth configured.

```bash
npm ci
cp .env.example .env
```

Set these values in `.env`:

| Variable | Purpose |
| --- | --- |
| `DATABASE_URL` | Your PostgreSQL connection string used by Drizzle's Neon HTTP driver |
| `NEON_AUTH_BASE_URL` | The Neon Auth URL for your project |
| `NEON_AUTH_COOKIE_SECRET` | A private random secret of at least 32 characters for session cookies |

You can generate a cookie secret with `openssl rand -base64 32`. Configure your
local and deployed origins in Neon Auth, and enable the sign-in methods you use.
The UI is configured for Google and email OTP.

Start the development server yourself:

```bash
npm run dev
```

Open [localhost:3000](http://localhost:3000). The default locale is Finnish; use
`/en` for English or `/fi` for Finnish. The locale proxy in `src/proxy.ts` redirects
`/` using the saved language preference or browser language, with Finnish as the fallback.

### Database

The schema lives in `src/db/schema.ts`, with migrations in `drizzle/`.

```bash
npm run db:gen     # Generate a migration from schema changes
npm run db:mig     # Apply migrations to DATABASE_URL
npm run db:studio  # Inspect the configured database
```

Review generated SQL before applying it. The initial migration includes
`neon_auth` tables; an existing Neon Auth project may already have those tables.
`npm run db:pu` pushes schema changes directly and is intended for deliberate
local schema work, not an automatic production deployment step.

## Tests

### Unit tests

No database or app server is needed.

```bash
npm run test:unit
```

Covers currency/date formatting, English/Finnish translation parity and
interpolation, and modal state transitions, including clearing CSV preview data.

### PostgreSQL integration tests

These execute the real tRPC procedures and Drizzle SQL against PostgreSQL with
synthetic users and records. Each test file creates and removes its own randomly
named schema. The app's Neon HTTP client is replaced with a local PostgreSQL
connection in the test process; the application database is not queried.

Start a disposable database, or use an existing test-only PostgreSQL database:

```bash
docker run --detach --rm --name expense-test-db \
  --publish 127.0.0.1:55439:5432 \
  --env POSTGRES_PASSWORD=expense-test \
  --env POSTGRES_DB=expense_test postgres:17

TEST_DATABASE_URL=postgresql://postgres:expense-test@127.0.0.1:55439/expense_test \
  npm run test:integration

docker stop expense-test-db
```

`TEST_DATABASE_URL` is required and should always point to a disposable database.
`npm test` runs unit and integration tests, so it also requires this variable.

Coverage includes:

- Authentication on every API procedure and isolation between users.
- Transaction, category, and budget creation, reading, editing, and deletion.
- Decimal amounts, invalid inputs, foreign-category rejection, and atomic imports.
- Category deletion without transaction loss and duplicate-budget protection.
- Expense-only spending totals, monthly boundaries, and empty accounts.
- Dashboard month/year/all-time aggregation, timezone boundaries, and budgets
  spanning several months without multiplying transaction totals.

### Browser tests

Playwright covers desktop and mobile layouts, language switching, landing-page
requests, document/404 rendering, dashboard periods and errors, transaction
forms and filters, CSV preview/import, categories, and budgets. It also checks
Google sign-in request routing and OAuth verifier preservation across locale
redirects. Every browser test fails on unhandled page errors, and a dashboard
regression checks that charts do not connect to a failing Redux DevTools extension.

**The tests never start or stop an app server.** Start one yourself in a separate
terminal, then run:

```bash
npx playwright install chromium
npm run test:e2e
```

To use a different local address:

```bash
PLAYWRIGHT_BASE_URL=http://localhost:3001 npm run test:e2e
```

Authentication and tRPC requests are intercepted with synthetic fixtures, so these
browser tests do not sign in to Neon or modify your real records. Real SQL and
ownership rules are covered separately by the integration suite. Live OAuth/email
login remains a manual check against your configured Neon Auth project.

Failure screenshots and traces are saved in `test-results/`; use
`npx playwright show-report` for the HTML report.

### Build and static document checks

```bash
npm run typecheck
npm run lint
npm run build
npm run test:build
```

The build checks verify that the generated English, Finnish, and 404 pages each
have one complete HTML document, preventing the missing-root-layout-tags error.
Google Fonts are downloaded during a fresh build, so network access is required.

## Production and performance

```bash
npm run build
npm start
```

Set the same environment variables on the hosting platform. Keep secrets out of
Git. Authentication and tRPC providers are scoped to the routes that use them;
the landing page does not load the auth background image or make session requests.

Measure Lighthouse against a production build, not `npm run dev`. Use matching
mobile/desktop settings when comparing runs. Local measurements are not a promise
of an identical score on the deployed site.

## Troubleshooting

- **Tailwind cannot resolve from a parent directory:** `next.config.ts` explicitly
  sets the Turbopack project root. Restart a server that was already running when
  this setting changed, and run npm commands from this repository.
- **Missing `<html>` or `<body>` tags:** the root layout is
  `src/app/[locale]/layout.tsx`; `src/app/global-not-found.tsx` supplies a complete
  document for unmatched routes. Restart after changing layout files.
- **Database tests cannot connect:** check that the test PostgreSQL instance is
  ready and that `TEST_DATABASE_URL` points to it, not your Neon application database.
- **Sign-in fails:** check Neon Auth's URL, cookie secret, allowed origins, and
  enabled providers. For an OAuth `state_mismatch`, start a fresh sign-in from the
  app instead of refreshing an old callback or error URL.
- **Redux DevTools throws `n.match is not a function` when switching chart periods:**
  the shared chart component disables Recharts' internal Redux DevTools integration.
  Reload the page after updating to discard previously connected chart stores.

## Project structure

```text
src/app/[locale]/       Localized pages and layouts
src/components/        Shared UI and landing page
src/server/routers/    Authenticated tRPC APIs
src/db/                Drizzle schema and database client
src/i18n/              Locale routing and request configuration
src/messages/          English and Finnish translations
src/store/             Modal and CSV preview state
tests/                 Unit, PostgreSQL, browser, and build regression tests
```

See [LICENSE](LICENSE) for licensing terms.
