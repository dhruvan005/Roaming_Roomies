
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

const connectionString = process.env.DATABASE_URL!;
// console.log('Connecting to database:', connectionString);
const connectionOptions = {
    max: 10,
    idle_timeout: 30,  // timeout in seconds
    connect_timeout: 15,
    max_lifetime: 60 * 60,

    // Retry Configuration
    retry: {
        times: 3,
        interval: 1000
    }
}

export const migrationClient = postgres(connectionString, connectionOptions);

// Connection for query builder
const queryClient = postgres(connectionString);
export const db = drizzle(queryClient, { schema });