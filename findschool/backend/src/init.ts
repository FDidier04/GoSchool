import { db } from './db/connection';
import { seedDatabase } from './db/seed';

export async function initializeApplication() {
  try {
    console.log('ðŸš€ Initializing GoSchool Application...\n');

    // Test database connection
    await db.one('SELECT 1');
    console.log('âœ“ Database connection successful');

    // Run seeds
    await seedDatabase();

    console.log('ðŸŽ‰ Application initialized successfully!\n');
  } catch (error) {
    console.error('âŒ Initialization failed:', error);
    process.exit(1);
  }
}
