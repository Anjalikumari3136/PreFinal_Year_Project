import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import User from './models/User.js';

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    const users = await User.find({}).select('name role designation department email adminRole');
    console.log(users);
    process.exit(0);
  })
  .catch(err => { console.error(err); process.exit(1); });
