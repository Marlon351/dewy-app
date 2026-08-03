import express from "express";
import authController from "./../controllers/authController.js";
import userController from "../controllers/userController.js";

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.patch('/updateMe', authController.protect, userController.updateMe);
router.delete('/deleteMe', authController.protect, userController.deleteMe);

export default router;