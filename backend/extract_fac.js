import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import User from './models/User.js';
import fs from 'fs';

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    const users = await User.find({ role: 'FACULTY' });
    fs.writeFileSync('faculties.json', JSON.stringify(users, null, 2));
    console.log('done');
    process.exit(0);
  })
  .catch(err => { console.error(err); process.exit(1); });
