import { connectToDatabase } from '../database/mongoose';

async function test() {
  try {
    console.log('Testing database connection...');
    await connectToDatabase();
    console.log('✅ Connection successful!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Connection failed:');
    console.error(error);
    process.exit(1);
  }
}

test();
