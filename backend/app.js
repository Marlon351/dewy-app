import express from 'express';
import { fileURLToPath } from 'node:url';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
//Routes Imports
import userRouter from "./routes/userRoutes.js";
import routineRouter from "./routes/routineRoutes.js";
import globalErrorHandler from './controllers/errorController.js';
import AppError from './utils/AppError.js';

const app = express();

// Behind a hosting proxy (e.g. Render), trust it so rate limiting sees each user's real IP
if (process.env.TRUST_PROXY){
    app.set('trust proxy', Number(process.env.TRUST_PROXY));
};

app.use(helmet());

// Privacy Policy and Terms of Service, served at /privacy and /terms
app.use(express.static(fileURLToPath(new URL('./public', import.meta.url)), { extensions: ['html'] }));

app.get('/health', (req, res) => {
    res.status(200).json({ status: "success" });
});

app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 300,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    message: { status: "fail", message: "Too many requests. Please try again later." },
}));

app.use(express.json({ limit: "20kb" }));

app.use('/users/', userRouter);
app.use('/routine/', routineRouter);

app.use((req, res, next) => {
    next(new AppError(404, "This route doesn't exist."));
});

app.use(globalErrorHandler);

export default app;