export const everyDay = [0, 1, 2, 3, 4, 5, 6];
export const dayInitials = ["S", "M", "T", "W", "T", "F", "S"];
const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const pad = (number) => String(number).padStart(2, "0");

// Dates are stored as local "YYYY-MM-DD" keys so they sort and compare as strings
export const toDateKey = (date) => {
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
};

export const fromDateKey = (dateKey) => {
    const [year, month, day] = dateKey.split("-").map(Number);
    return new Date(year, month - 1, day);
};

export const formatDays = (days) => {
    if (days.length === 7) {
        return "Every day";
    }
    return [...days].sort().map(day => dayNames[day]).join(" · ");
};

export const getScheduledSteps = (steps, dateKey) => {
    const weekday = fromDateKey(dateKey).getDay();
    return steps.filter(step => step.days.includes(weekday));
};

// "complete" when every routine scheduled that day was finished, "partial" when any step was checked off
export const getDayStatus = (routine, dateKey) => {
    const log = routine.logs[dateKey];
    const scheduledPeriods = ["am", "pm"].filter(period => getScheduledSteps(routine[period], dateKey).length > 0);
    const completedPeriods = scheduledPeriods.filter(period => log?.[period]?.completed);

    if (scheduledPeriods.length > 0 && completedPeriods.length === scheduledPeriods.length) {
        return "complete";
    }
    if (log?.am?.completedSteps.length > 0 || log?.pm?.completedSteps.length > 0) {
        return "partial";
    }
    return "none";
};

export const getStreaks = (routine) => {
    const dateKeys = Object.keys(routine.logs).sort();
    if (dateKeys.length === 0) {
        return { current: 0, best: 0 };
    }

    const todayKey = toDateKey(new Date());
    const day = fromDateKey(dateKeys[0]);
    let current = 0;
    let best = 0;

    while (toDateKey(day) <= todayKey) {
        const dateKey = toDateKey(day);
        if (getDayStatus(routine, dateKey) === "complete") {
            current++;
            best = Math.max(best, current);
        }
        // Today isn't over yet, so an unfinished today doesn't break the streak
        else if (dateKey !== todayKey) {
            current = 0;
        }
        day.setDate(day.getDate() + 1);
    }

    return { current, best };
};

export const getWeekDateKeys = (date) => {
    const sunday = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay());
    return everyDay.map(offset => toDateKey(new Date(sunday.getFullYear(), sunday.getMonth(), sunday.getDate() + offset)));
};

// Returns the month's date keys, padded with nulls so the first day lines up under its weekday
export const getMonthGrid = (year, month) => {
    const leadingBlanks = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const dateKeys = Array.from({ length: daysInMonth }, (_, index) => toDateKey(new Date(year, month, index + 1)));
    return [...Array(leadingBlanks).fill(null), ...dateKeys];
};
