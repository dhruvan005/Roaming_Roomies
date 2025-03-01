

// import { drizzle } from 'drizzle-orm/postgres-js';
// import { migrate } from 'drizzle-orm/postgres-js/migrator';
// import { migrationClient } from './index';
// import * as dotenv from 'dotenv';

// dotenv.config();

// const runMigration = async () => {
//   const db = drizzle(migrationClient);
  
//   console.log('Running migrations...');
  
//   await migrate(db, { migrationsFolder: './server/db/drizzle' });
  
//   console.log('Migrations completed!');
//   await migrationClient.end();
// };

// runMigration().catch((err) => {
//   console.error('Migration failed!', err);
//   process.exit(1);
// });

import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { migrationClient, db } from '../db';

// This will run the migrations in the drizzle folder
async function runMigrations() {
  console.log('Running migrations...');
  
  try {
    await migrate(db, { migrationsFolder: './server/db/drizzle' });
    console.log('Migrations completed successfully');
  } catch (error) {
    console.error('Migration error:', error);
  } finally {
    await migrationClient.end();
    process.exit(0);
  }
}

runMigrations();