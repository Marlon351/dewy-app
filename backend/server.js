import app from './app.js';
import 'dotenv/config';
import mongoose from 'mongoose';
//.env variables
const PORT = process.env.PORT; 
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
//MongoDB server connection
mongoose.connect(DB).then(() => console.log("Database connection was succesful!"));


const server = app.listen(PORT, () => {
  console.log(`App running on port ${PORT}...`);
});