import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import AppScreen from "../../components/AppScreen/AppScreen";
import { useTheme } from "@react-navigation/native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCircle } from "@fortawesome/free-regular-svg-icons";
import { faCheck, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { toggleStep } from "../../redux/reducers/routineSlice";
import { Routes } from "../../navigation/Routes";
import { dayInitials, getDayStatus, getScheduledSteps, getStreaks, getWeekDateKeys, toDateKey } from "../../utils/progress";
import { getDailyTip, getGreeting, getStepEmoji, getStreakMessage } from "../../utils/emojis";
import createStyles from "./style";

const Home = ({ navigation }) => {
    const user = useSelector(state => state.persist.user);
    const routine = useSelector(state => state.persist.routine);
    const dispatch = useDispatch();
    const theme = useTheme();
    const styles = createStyles(theme);

    const today = new Date();
    const todayKey = toDateKey(today);
    const { current, best } = getStreaks(routine);
    const isDayComplete = getDayStatus(routine, todayKey) === "complete";

    const periods = {
        am: { title: "Morning Routine", emoji: "☀️", color: theme.colors.morning, lightColor: theme.colors.morningLight },
        pm: { title: "Evening Routine", emoji: "🌙", color: theme.colors.evening, lightColor: theme.colors.eveningLight },
    };

    const weekDay = (dateKey, index) => {
        const status = getDayStatus(routine, dateKey);
        const isToday = dateKey === todayKey;
        return (
            <View key={dateKey} style={styles.weekDay}>
                <Text style={[styles.weekDayLabel, isToday && styles.weekDayLabelToday]}>{dayInitials[index]}</Text>
                <View style={[styles.weekDayCircle, status === "complete" && styles.weekDayComplete, status === "partial" && styles.weekDayPartial, isToday && status === "none" && styles.weekDayToday]}>
                    {status === "complete" && <FontAwesomeIcon icon={faCheck} color={theme.colors.primary} size={12} />}
                </View>
            </View>
        );
    };

    const routineCard = (period) => {
        const { title, emoji, color, lightColor } = periods[period];
        const scheduledSteps = getScheduledSteps(routine[period], todayKey);
        const completedSteps = routine.logs[todayKey]?.[period]?.completedSteps ?? [];
        const doneCount = scheduledSteps.filter(step => completedSteps.includes(step.id)).length;
        const isComplete = scheduledSteps.length > 0 && doneCount === scheduledSteps.length;

        return (
            <View style={[styles.card, isComplete && { borderColor: color, backgroundColor: lightColor }]}>
                <View style={styles.cardHeader}>
                    <View style={[styles.cardEmojiContainer, { backgroundColor: lightColor }]}>
                        <Text style={styles.cardEmoji}>{emoji}</Text>
                    </View>
                    <Text style={styles.cardTitle}>{title}</Text>
                    {scheduledSteps.length > 0 &&
                        <View style={[styles.countPill, { backgroundColor: lightColor }]}>
                            <Text style={[styles.countPillText, { color: color }]}>{doneCount}/{scheduledSteps.length}</Text>
                        </View>
                    }
                </View>

                {scheduledSteps.length === 0 ?
                    <Pressable onPress={() => navigation.navigate(Routes.Routine)}>
                        <Text style={styles.emptyText}>😴 Nothing scheduled today. <Text style={styles.linkText}>Edit routine</Text></Text>
                    </Pressable>
                    :
                    <>
                        <View style={[styles.progressTrack, { backgroundColor: lightColor }]}>
                            <View style={[styles.progressFill, { width: `${(doneCount / scheduledSteps.length) * 100}%`, backgroundColor: color }]} />
                        </View>
                        {isComplete && <Text style={[styles.completeText, { color: color }]}>🎉 {title} complete! Nice work.</Text>}
                        {scheduledSteps.map(step => {
                            const isDone = completedSteps.includes(step.id);
                            return (
                                <Pressable key={step.id} style={styles.stepRow} onPress={() => dispatch(toggleStep({ date: todayKey, period, stepId: step.id }))}>
                                    <View style={[styles.stepEmojiContainer, { backgroundColor: lightColor }]}>
                                        <Text style={styles.stepEmoji}>{getStepEmoji(step.name)}</Text>
                                    </View>
                                    <View style={styles.stepTextContainer}>
                                        <Text style={[styles.stepName, isDone && styles.stepNameDone]}>{step.name}</Text>
                                        {step.product !== "" && <Text style={styles.stepProduct}>{step.product}</Text>}
                                    </View>
                                    <FontAwesomeIcon icon={isDone ? faCircleCheck : faCircle} color={isDone ? color : theme.colors.border} size={24} />
                                </Pressable>
                            );
                        })}
                    </>
                }
            </View>
        );
    };

    return (
        <AppScreen>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                <View style={styles.headerContainer}>
                    <Text style={styles.headerIntroText}>{getGreeting(today)}</Text>
                    <Text style={styles.headerFirstNameText}>{user.firstName} 👋</Text>
                </View>

                <View style={styles.streakCard}>
                    <View style={styles.streakRow}>
                        <View style={styles.streakEmojiContainer}>
                            <Text style={styles.streakEmoji}>🔥</Text>
                        </View>
                        <View style={styles.streakTextContainer}>
                            <Text style={styles.streakNumber}>{current} day streak</Text>
                            <Text style={styles.streakMessage}>{getStreakMessage(current)}</Text>
                        </View>
                        <View style={styles.bestPill}>
                            <Text style={styles.bestText}>🏆 {best}</Text>
                        </View>
                    </View>
                    <View style={styles.weekContainer}>
                        {getWeekDateKeys(today).map((dateKey, index) => weekDay(dateKey, index))}
                    </View>
                </View>

                <View style={styles.tipCard}>
                    <Text style={styles.tipTitle}>TIP OF THE DAY</Text>
                    <Text style={styles.tipText}>{getDailyTip(today)}</Text>
                </View>

                <Text style={styles.sectionHeader}>TODAY</Text>
                {isDayComplete &&
                    <View style={styles.celebrationCard}>
                        <Text style={styles.celebrationEmoji}>🌟</Text>
                        <View style={styles.celebrationTextContainer}>
                            <Text style={styles.celebrationTitle}>All done for today!</Text>
                            <Text style={styles.celebrationText}>Your skin thanks you. See you tomorrow ✨</Text>
                        </View>
                    </View>
                }
                <View style={styles.cardsContainer}>
                    {routineCard("am")}
                    {routineCard("pm")}
                </View>
            </ScrollView>
        </AppScreen>
    )
}

export default Home;
