import express from "express";
import authController from "./../controllers/authController.js";
import userController from "../controllers/userController.js";
import rateLimit from "express-rate-limit";

const router = express.Router();

// Stricter limit on routes that check passwords or codes, to slow down guessing
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 20,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    message: { status: "fail", message: "Too many attempts. Please try again in 15 minutes." },
});

router.post('/register', authLimiter, authController.register);
router.post('/login', authLimiter, authController.login);
router.post('/forgotPassword', authLimiter, authController.forgotPassword);
router.post('/verifyEmail', authLimiter, authController.verifyEmail);
router.post('/resetMyPassword', authController.protectPasswordReset, authController.resetMyPassword);
router.patch('/updateMyPassword', authLimiter, authController.protect, authController.updateMyPassword);
router.get('/getMe', authController.protect, userController.getMe);
router.patch('/updateMe', authController.protect, userController.updateMe);
router.delete('/deleteMe', authController.protect, userController.deleteMe);

export default router;