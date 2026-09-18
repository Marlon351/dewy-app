import express from 'express';
//Routes Imports
import userRouter from "./routes/userRoutes.js";
import globalErrorHandler from './controllers/errorController.js';

const app = express();

app.use(express.json());

app.use('/users/', userRouter);

app.use(globalErrorHandler);

export default app;