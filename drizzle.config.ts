import 'dotenv/config';
import type { Config } from 'drizzle-kit';

export default ({
  out: './drizzle',
  schema: './src/db/schema.ts',
  dialect: 'postgresql',
  schemaFilter: ['public', 'neon_auth'],
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
}) satisfies Config;

