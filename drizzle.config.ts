import { config } from 'dotenv';
import { defineConfig } from "drizzle-kit";
config({ path: '.env' });

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema.ts',
  dialect: 'postgresql',
  schemaFilter: ['public', 'neon_auth'],
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});

