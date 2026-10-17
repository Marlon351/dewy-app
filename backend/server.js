import app from './app.js';
import 'dotenv/config';
import mongoose from 'mongoose';
//Refuse to start without the settings the app needs to run securely
const requiredVariables = ["PORT", "DATABASE", "DATABASE_PASSWORD", "JWT_SECRET", "JWT_EXPIRES_IN", "PASSWORD_WORK_FACTOR", "ENCRYPTION_KEY", "EMAIL_USERNAME", "EMAIL_PASSWORD"];
const missingVariables = requiredVariables.filter(variable => !process.env[variable]);
if (missingVariables.length > 0){
  console.log(`Missing environment variables: ${missingVariables.join(", ")}`);
  process.exit(1);
};
//.env variables
const PORT = process.env.PORT; 
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
//Stops request values like { "$ne": null } from being used as query operators
mongoose.set('sanitizeFilter', true);
//MongoDB server connection
mongoose.connect(DB)
  .then(() => console.log("Database connection was succesful!"))
  .catch((err) => {
    console.log("Database connection failed.", err);
    process.exit(1);
  });

const server = app.listen(PORT, () => {
  console.log(`App running on port ${PORT}...`);
});