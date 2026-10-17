import { formatDays, getDayStatus, getMonthGrid, getScheduledSteps, getStreaks, getWeekDateKeys, toDateKey } from '../utils/progress';
import { getStepEmoji } from '../utils/emojis';

const everyDay = [0, 1, 2, 3, 4, 5, 6];
const done = { completedSteps: ['step'], completed: true };
const started = { completedSteps: ['step'], completed: false };

const daysAgo = (days) => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return toDateKey(date);
};

const createRoutine = (logs) => ({
  am: [{ id: 'am-1', name: 'Cleanser', product: '', days: everyDay }],
  pm: [{ id: 'pm-1', name: 'Retinol', product: '', days: everyDay }],
  logs,
});

describe('getDayStatus', () => {
  test('a day is complete only when every scheduled routine is done', () => {
    const routine = createRoutine({ [daysAgo(0)]: { am: done, pm: started } });
    expect(getDayStatus(routine, daysAgo(0))).toBe('partial');

    routine.logs[daysAgo(0)].pm = done;
    expect(getDayStatus(routine, daysAgo(0))).toBe('complete');
  });

  test('a day with nothing checked off has no status', () => {
    expect(getDayStatus(createRoutine({}), daysAgo(0))).toBe('none');
  });
});

describe('getStreaks', () => {
  test('a missed day resets the current streak but keeps the best', () => {
    const routine = createRoutine({
      [daysAgo(6)]: { am: done, pm: done },
      [daysAgo(5)]: { am: done, pm: done },
      [daysAgo(4)]: { am: done, pm: done },
      [daysAgo(2)]: { am: done, pm: done },
      [daysAgo(1)]: { am: done, pm: done },
    });
    expect(getStreaks(routine)).toEqual({ current: 2, best: 3 });
  });

  test("an unfinished today doesn't break the streak", () => {
    const routine = createRoutine({
      [daysAgo(1)]: { am: done, pm: done },
      [daysAgo(0)]: { am: started, pm: started },
    });
    expect(getStreaks(routine).current).toBe(1);
  });

  test('no logs means no streak', () => {
    expect(getStreaks(createRoutine({}))).toEqual({ current: 0, best: 0 });
  });
});

describe('scheduling and dates', () => {
  test('steps only show up on their scheduled days', () => {
    // October 12, 2026 is a Monday
    const steps = [{ id: 'retinol', days: [1, 3, 5] }, { id: 'cleanser', days: everyDay }];
    expect(getScheduledSteps(steps, '2026-10-12').map(step => step.id)).toEqual(['retinol', 'cleanser']);
    expect(getScheduledSteps(steps, '2026-10-13').map(step => step.id)).toEqual(['cleanser']);
  });

  test('month grid lines the first day up under its weekday', () => {
    // October 1, 2026 is a Thursday
    const grid = getMonthGrid(2026, 9);
    expect(grid.slice(0, 5)).toEqual([null, null, null, null, '2026-10-01']);
    expect(grid.filter(Boolean)).toHaveLength(31);
  });

  test('week starts on Sunday', () => {
    expect(getWeekDateKeys(new Date(2026, 9, 15))[0]).toBe('2026-10-11');
  });

  test('days are formatted for display', () => {
    expect(formatDays(everyDay)).toBe('Every day');
    expect(formatDays([5, 1, 3])).toBe('Mon · Wed · Fri');
  });
});

describe('getStepEmoji', () => {
  test('specific names win over general ones', () => {
    expect(getStepEmoji('Vitamin C Serum')).toBe('🍊');
    expect(getStepEmoji('Eye Cream')).toBe('👀');
    expect(getStepEmoji('Night Cream')).toBe('🧴');
    expect(getStepEmoji('Niacinamide')).toBe('🫧');
  });
});
