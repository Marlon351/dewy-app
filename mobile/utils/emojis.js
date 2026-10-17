// Checked in order, so more specific names (e.g. "vitamin c") come before general ones (e.g. "serum")
const stepEmojis = [
    ["vitamin c", "🍊"],
    ["eye", "👀"],
    ["cleans", "🧼"],
    ["toner", "💦"],
    ["essence", "💦"],
    ["serum", "💧"],
    ["moistur", "🧴"],
    ["cream", "🧴"],
    ["sunscreen", "🌞"],
    ["spf", "🌞"],
    ["exfoli", "✨"],
    ["retin", "🧪"],
    ["acid", "🧪"],
    ["mask", "🎭"],
    ["oil", "🫒"],
    ["lip", "💋"],
];

export const getStepEmoji = (name) => {
    const lowerCaseName = name.toLowerCase();
    return stepEmojis.find(([keyword]) => lowerCaseName.includes(keyword))?.[1] ?? "🫧";
};

export const getGreeting = (date) => {
    const hour = date.getHours();
    if (hour < 12) {
        return "Good morning ☀️";
    }
    if (hour < 18) {
        return "Good afternoon 🌤️";
    }
    return "Good evening 🌙";
};

export const getStreakMessage = (streak) => {
    if (streak === 0) {
        return "Finish today's routines to start a streak 🌱";
    }
    if (streak < 3) {
        return "Nice start, keep it going! 💪";
    }
    if (streak < 7) {
        return "You're on fire! Don't stop now 🔥";
    }
    if (streak < 14) {
        return "Over a week strong ✨";
    }
    if (streak < 30) {
        return "Unstoppable glow 🌟";
    }
    return "Glass skin legend 💎";
};

export const getMonthMessage = (rate) => {
    if (rate === 0) {
        return "🌱 Every glow up starts with day one.";
    }
    if (rate < 50) {
        return "🌤️ Building the habit. Consistency is everything!";
    }
    if (rate < 80) {
        return "💪 Great consistency this month!";
    }
    return "🌟 Glass skin incoming. Amazing work!";
};

export const skinRatings = [
    { emoji: "😣", label: "Irritated" },
    { emoji: "🙁", label: "Not great" },
    { emoji: "😐", label: "Okay" },
    { emoji: "🙂", label: "Good" },
    { emoji: "🤩", label: "Glowing" },
];

const skincareTips = [
    "💧 Apply moisturizer while your skin is still damp to lock in hydration.",
    "🌞 Sunscreen is the best anti-aging product. Wear it even when it's cloudy.",
    "🧪 Start retinol slowly, two or three nights a week, and build up.",
    "🍊 Vitamin C works best in the morning, under your sunscreen.",
    "🧼 Cleanse for a full 60 seconds to really break down sunscreen and makeup.",
    "🛏️ Change your pillowcase every few days to help prevent breakouts.",
    "✨ Don't over-exfoliate. Two or three times a week is plenty.",
    "🥤 Drinking water helps, but topical hydration is what your skin barrier needs.",
    "👀 Use your ring finger to apply eye cream. It's the gentlest.",
    "📸 Take a progress photo once a month. Changes are slow but real.",
    "🧴 Layer from thinnest to thickest texture for the best absorption.",
    "😴 Sleep is skincare. Your skin repairs itself overnight.",
];

// Same tip all day, a new one tomorrow
export const getDailyTip = (date) => {
    const startOfYear = new Date(date.getFullYear(), 0, 0);
    const dayOfYear = Math.floor((date - startOfYear) / (1000 * 60 * 60 * 24));
    return skincareTips[dayOfYear % skincareTips.length];
};
