import mongoose from 'mongoose';
import config from '../config/config';

mongoose.Promise = global.Promise;

const connectToDb = async () => {
  try {
    await mongoose.connect(config.mongoUrl);
  } catch (error) {
    console.log(error);
  }
};

export default connectToDb;
