import mongoose from 'mongoose';

// Connection URL
const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@movieclone.b2l7j.mongodb.net/?retryWrites=true&w=majority`;

const dbConnection = async () => {
  try {
    const db = await mongoose.connect(uri, { dbName: 'PNUTCHAT' });
    console.log(`Successfully connected to database: ${db}`);
  } catch (e) {
    console.log('mongodb connection error', e);
  }
};

export default dbConnection;
