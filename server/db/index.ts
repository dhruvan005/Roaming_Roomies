
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

// For Neon, use SSL and pooling options
const connectionString = process.env.DATABASE_URL!;

// Connection for migrations
export const migrationClient = postgres(connectionString, {
    max: 1,
    idle_timeout: 30000,  // 30 seconds timeout
},);

// Connection for query builder
const queryClient = postgres(connectionString);
export const db = drizzle(queryClient, { schema });