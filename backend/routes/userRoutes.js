import express from "express";
import authController from "./../controllers/authController.js";
import userController from "../controllers/userController.js";

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/getMe', authController.protect, userController.getMe);
router.delete('/deleteMe', authController.protect, userController.deleteMe);

export default router;