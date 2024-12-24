const mongoose = require('mongoose');

const connectDB = async () : Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {});
    if (process.env.NODE_ENV !== 'test') {
      console.log('MongoDB connected');
    }
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

export default connectDB;
