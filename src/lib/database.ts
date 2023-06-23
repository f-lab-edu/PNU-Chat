import mongoose from 'mongoose';
// Connection URL

const dbConnection = async () => {
  try {
    const db = await mongoose.connect(process.env.DB_URL as string, { dbName: process.env.DB_NAME });
    console.log(`Successfully connected to database: ${db}`);
  } catch (e) {
    console.log('mongodb connection error', e);
  }
};

export default dbConnection;
