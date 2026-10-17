import React, { useEffect, useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@react-navigation/native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import AppScreen from "../../components/AppScreen/AppScreen";
import { setSkinLog } from "../../redux/reducers/routineSlice";
import { dayInitials, fromDateKey, getDayStatus, getMonthGrid, getScheduledSteps, getStreaks, toDateKey } from "../../utils/progress";
import { getMonthMessage, skinRatings } from "../../utils/emojis";
import createStyles from "./style";

const Calendar = ({navigation}) => {
    const today = new Date();
    const todayKey = toDateKey(today);
    const [visibleMonth, setVisibleMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
    const [selectedDateKey, setSelectedDateKey] = useState(todayKey);
    const [note, setNote] = useState("");
    const routine = useSelector(state => state.persist.routine);
    const dispatch = useDispatch();
    const theme = useTheme();
    const styles = createStyles(theme);

    const selectedLog = routine.logs[selectedDateKey];
    const { current, best } = getStreaks(routine);
    const monthGrid = getMonthGrid(visibleMonth.getFullYear(), visibleMonth.getMonth());
    const elapsedDateKeys = monthGrid.filter(dateKey => dateKey && dateKey <= todayKey);
    const completedDays = elapsedDateKeys.filter(dateKey => getDayStatus(routine, dateKey) === "complete").length;
    const monthRate = elapsedDateKeys.length > 0 ? Math.round((completedDays / elapsedDateKeys.length) * 100) : 0;

    useEffect(() => {
        setNote(routine.logs[selectedDateKey]?.note ?? "");
    }, [selectedDateKey, routine.logs]);

    const changeMonth = (direction) => {
        setVisibleMonth(new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() + direction, 1));
    };

    const statTile = (emoji, value, label, color, lightColor) => {
        return (
            <View style={[styles.statTile, { backgroundColor: lightColor }]}>
                <Text style={styles.statEmoji}>{emoji}</Text>
                <Text style={[styles.statValue, { color: color }]}>{value}</Text>
                <Text style={styles.statLabel}>{label}</Text>
            </View>
        );
    };

    const calendarDay = (dateKey, index) => {
        if (!dateKey) {
            return <View key={`blank-${index}`} style={styles.dayCell} />;
        }
        const status = getDayStatus(routine, dateKey);
        const isFuture = dateKey > todayKey;
        return (
            <Pressable key={dateKey} style={styles.dayCell} disabled={isFuture} onPress={() => setSelectedDateKey(dateKey)}>
                <View style={[styles.dayCircle, dateKey === selectedDateKey && styles.daySelected]}>
                    <View style={[styles.dayInner, status === "complete" && styles.dayComplete, status === "partial" && styles.dayPartial]}>
                        <Text style={[styles.dayText, dateKey === todayKey && styles.dayTextToday, status === "complete" && styles.dayTextComplete, isFuture && styles.dayTextFuture]}>
                            {fromDateKey(dateKey).getDate()}
                        </Text>
                    </View>
                </View>
            </Pressable>
        );
    };

    const periodStatus = (period) => {
        const scheduledSteps = getScheduledSteps(routine[period], selectedDateKey);
        const completedSteps = selectedLog?.[period]?.completedSteps ?? [];
        const doneCount = scheduledSteps.filter(step => completedSteps.includes(step.id)).length;

        const color = period === "am" ? theme.colors.morning : theme.colors.evening;
        const lightColor = period === "am" ? theme.colors.morningLight : theme.colors.eveningLight;

        let statusText = "Not started";
        if (selectedLog?.[period]?.completed) {
            statusText = "Done ✅";
        }
        else if (scheduledSteps.length === 0) {
            statusText = "Rest day 😴";
        }
        else if (doneCount > 0) {
            statusText = `${doneCount} of ${scheduledSteps.length} steps`;
        }

        return (
            <View style={styles.periodRow}>
                <View style={[styles.periodEmojiContainer, { backgroundColor: lightColor }]}>
                    <Text style={styles.periodEmoji}>{period === "am" ? "☀️" : "🌙"}</Text>
                </View>
                <Text style={styles.periodLabel}>{period === "am" ? "Morning" : "Evening"}</Text>
                <Text style={[styles.periodStatus, selectedLog?.[period]?.completed && [styles.periodStatusComplete, { color: color }]]}>{statusText}</Text>
            </View>
        );
    };

    return (
        <AppScreen>
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" automaticallyAdjustKeyboardInsets={true} contentContainerStyle={styles.scrollContent}>
                <Text style={styles.title}>Progress 📈</Text>

                <View style={styles.statsContainer}>
                    {statTile("🔥", current, "Day streak", theme.colors.streak, theme.colors.streakLight)}
                    {statTile("🏆", best, "Best streak", theme.colors.gold, theme.colors.goldLight)}
                    {statTile("✨", `${monthRate}%`, "This month", theme.colors.primary, theme.colors.primaryLight)}
                </View>
                <Text style={styles.monthMessage}>{getMonthMessage(monthRate)}</Text>

                <View style={styles.card}>
                    <View style={styles.monthHeader}>
                        <Pressable hitSlop={10} onPress={() => changeMonth(-1)}>
                            <FontAwesomeIcon icon={faChevronLeft} color={theme.colors.text} size={16} />
                        </Pressable>
                        <Text style={styles.monthText}>{visibleMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })}</Text>
                        <Pressable hitSlop={10} onPress={() => changeMonth(1)}>
                            <FontAwesomeIcon icon={faChevronRight} color={theme.colors.text} size={16} />
                        </Pressable>
                    </View>
                    <View style={styles.grid}>
                        {dayInitials.map((initial, index) => (
                            <View key={`initial-${index}`} style={styles.dayCell}>
                                <Text style={styles.weekdayText}>{initial}</Text>
                            </View>
                        ))}
                        {monthGrid.map((dateKey, index) => calendarDay(dateKey, index))}
                    </View>
                    <View style={styles.legend}>
                        <View style={[styles.legendDot, styles.dayComplete]} />
                        <Text style={styles.legendText}>Complete</Text>
                        <View style={[styles.legendDot, styles.dayPartial]} />
                        <Text style={styles.legendText}>Partial</Text>
                    </View>
                </View>

                <Text style={styles.sectionHeader}>{fromDateKey(selectedDateKey).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" }).toUpperCase()}</Text>
                <View style={styles.card}>
                    {periodStatus("am")}
                    {periodStatus("pm")}

                    <View style={styles.divider} />

                    <Text style={styles.checkInTitle}>💗 How did your skin feel?</Text>
                    <View style={styles.ratingContainer}>
                        {skinRatings.map((rating, index) => {
                            const isSelected = selectedLog?.rating === index + 1;
                            return (
                                <Pressable key={rating.emoji} style={styles.ratingOption} onPress={() => dispatch(setSkinLog({ date: selectedDateKey, rating: index + 1 }))}>
                                    <View style={[styles.ratingButton, isSelected && styles.ratingButtonSelected]}>
                                        <Text style={[styles.ratingEmoji, isSelected && styles.ratingEmojiSelected]}>{rating.emoji}</Text>
                                    </View>
                                    <Text style={[styles.ratingLabel, isSelected && styles.ratingLabelSelected]}>{rating.label}</Text>
                                </Pressable>
                            );
                        })}
                    </View>
                    <TextInput
                        style={styles.noteInput}
                        value={note}
                        multiline={true}
                        placeholder={"📝 Notes: breakouts, irritation, glow, new products..."}
                        placeholderTextColor={theme.colors.secondaryText}
                        onChangeText={(text) => setNote(text)}
                        onEndEditing={() => dispatch(setSkinLog({ date: selectedDateKey, note }))}
                    />
                </View>
            </ScrollView>
        </AppScreen>
    );
};

export default Calendar;
