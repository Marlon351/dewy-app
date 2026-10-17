import Routine from "../models/routineModel.js";
import DailyLog from "../models/dailyLogModel.js";
import AppError from "../utils/AppError.js";

// Only the fields the app needs are sent back, decrypted by the model getters
const formatSteps = (steps) => {
    return steps.map(step => ({
        id: step.stepId,
        name: step.name,
        product: step.product,
        days: step.days,
    }));
};

const formatPeriodLog = (periodLog) => {
    return {
        completedSteps: periodLog.completedSteps,
        completed: periodLog.completed,
    };
};

// Pick out known fields so nothing else in the request body gets saved
const toStepDocuments = (steps) => {
    return steps.map(step => ({
        stepId: step?.id,
        name: step?.name,
        product: step?.product,
        days: step?.days,
    }));
};

const toPeriodLogDocument = (periodLog) => {
    return {
        completedSteps: periodLog?.completedSteps ?? [],
        completed: periodLog?.completed === true,
    };
};

const getRoutine = async (req, res, next) => {
    const userId = req.user._id;

    const routine = await Routine.findOne({ user: userId });
    const dailyLogs = await DailyLog.find({ user: userId });

    const logs = {};
    dailyLogs.forEach(log => {
        logs[log.date] = {
            am: formatPeriodLog(log.am),
            pm: formatPeriodLog(log.pm),
            rating: log.rating,
            note: log.note,
        };
    });

    return res.status(200).json({
        status: "success",
        data: {
            routine: routine ? { am: formatSteps(routine.am), pm: formatSteps(routine.pm) } : null,
            logs,
        },
    });
};

const updateRoutine = async (req, res, next) => {
    const userId = req.user._id;
    const { am, pm } = req.body;

    if (!Array.isArray(am) || !Array.isArray(pm)){
        return next(new AppError(400, "Please provide your morning and evening steps."));
    };

    const routine = await Routine.findOne({ user: userId }) ?? new Routine({ user: userId });
    routine.am = toStepDocuments(am);
    routine.pm = toStepDocuments(pm);
    await routine.save();

    return res.status(200).json({
        status: "success",
        data: { am: formatSteps(routine.am), pm: formatSteps(routine.pm) },
    });
};

const updateLog = async (req, res, next) => {
    const userId = req.user._id;
    const { date } = req.params;
    const { am, pm, rating, note } = req.body;

    const log = await DailyLog.findOne({ user: userId, date }) ?? new DailyLog({ user: userId, date });
    log.am = toPeriodLogDocument(am);
    log.pm = toPeriodLogDocument(pm);
    log.rating = rating;
    log.note = note;
    await log.save();

    return res.status(200).json({
        status: "success",
    });
};

export default {
    getRoutine,
    updateRoutine,
    updateLog,
};
