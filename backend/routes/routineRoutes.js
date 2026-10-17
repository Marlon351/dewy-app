import express from "express";
import authController from "../controllers/authController.js";
import routineController from "../controllers/routineController.js";

const router = express.Router();

// Every routine route requires a logged in user, and only ever reads or writes that user's data
router.use(authController.protect);

router.get('/', routineController.getRoutine);
router.put('/', routineController.updateRoutine);
router.put('/logs/:date', routineController.updateLog);

export default router;
