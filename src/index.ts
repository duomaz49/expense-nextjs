import { config } from "dotenv";
import { drizzle } from 'drizzle-orm/neon-http';
config({ path: ".env" });

const db = drizzle(process.env.DATABASE_URL!);
