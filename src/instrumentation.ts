import dbConnection from '@/lib/database';

export default async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    await dbConnection();
  }
}
