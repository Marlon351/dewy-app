import { StyleSheet } from "react-native";


const createStyles = (theme) => StyleSheet.create({
    scrollContent: {
        paddingBottom: 30,
    },
    headerContainer: {
        marginTop: 20,
    },
    headerIntroText: {
        color: theme.colors.secondaryText,
        fontSize: 16,
        fontWeight: 400,
        lineHeight: 19,
    },
    headerFirstNameText: {
        marginTop: 4,
        fontSize: 28,
        fontWeight: 'bold',
        lineHeight: 34,
        color: theme.colors.primary,
    },
    streakCard: {
        marginTop: 20,
        padding: 18,
        gap: 18,
        borderRadius: 20,
        backgroundColor: theme.colors.primary,
    },
    streakRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 14,
    },
    streakEmojiContainer: {
        height: 52,
        width: 52,
        borderRadius: 26,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "rgba(255, 255, 255, 0.25)",
    },
    streakEmoji: {
        fontSize: 28,
    },
    streakTextContainer: {
        flex: 1,
        gap: 2,
    },
    streakNumber: {
        fontSize: 24,
        fontWeight: 'bold',
        color: "#FFFFFF",
    },
    streakMessage: {
        fontSize: 13,
        fontWeight: 500,
        color: "rgba(255, 255, 255, 0.92)",
    },
    bestPill: {
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 14,
        backgroundColor: "rgba(255, 255, 255, 0.25)",
    },
    bestText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: "#FFFFFF",
    },
    weekContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    weekDay: {
        alignItems: 'center',
        gap: 6,
    },
    weekDayLabel: {
        fontSize: 12,
        fontWeight: 500,
        color: "rgba(255, 255, 255, 0.8)",
    },
    weekDayLabelToday: {
        fontWeight: 'bold',
        color: "#FFFFFF",
    },
    weekDayCircle: {
        height: 30,
        width: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: "rgba(255, 255, 255, 0.35)",
    },
    weekDayComplete: {
        borderColor: "#FFFFFF",
        backgroundColor: "#FFFFFF",
    },
    weekDayPartial: {
        borderColor: "#FFFFFF",
    },
    weekDayToday: {
        borderStyle: 'dashed',
        borderColor: "#FFFFFF",
    },
    tipCard: {
        marginTop: 16,
        padding: 16,
        gap: 6,
        borderRadius: 16,
        backgroundColor: theme.colors.blueLight,
    },
    tipTitle: {
        fontSize: 12,
        fontWeight: 'bold',
        letterSpacing: 0.5,
        color: theme.colors.blue,
    },
    tipText: {
        fontSize: 15,
        lineHeight: 21,
        color: theme.colors.text,
    },
    sectionHeader: {
        marginTop: 28,
        marginBottom: 8,
        marginLeft: 16,
        fontSize: 13,
        color: theme.colors.secondaryText,
    },
    celebrationCard: {
        marginBottom: 16,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 14,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: theme.colors.primary,
        backgroundColor: theme.colors.primaryLight,
    },
    celebrationEmoji: {
        fontSize: 32,
    },
    celebrationTextContainer: {
        flex: 1,
        gap: 2,
    },
    celebrationTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: theme.colors.text,
    },
    celebrationText: {
        fontSize: 14,
        color: theme.colors.secondaryText,
    },
    cardsContainer: {
        gap: 16,
    },
    card: {
        padding: 16,
        gap: 12,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: theme.colors.border,
        backgroundColor: theme.colors.card,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    cardEmojiContainer: {
        height: 40,
        width: 40,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardEmoji: {
        fontSize: 22,
    },
    cardTitle: {
        flex: 1,
        fontSize: 18,
        fontWeight: 'bold',
        color: theme.colors.text,
    },
    countPill: {
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 12,
    },
    countPillText: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    progressTrack: {
        height: 10,
        borderRadius: 5,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        borderRadius: 5,
    },
    completeText: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    stepRow: {
        paddingVertical: 4,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    stepEmojiContainer: {
        height: 36,
        width: 36,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    stepEmoji: {
        fontSize: 18,
    },
    stepTextContainer: {
        flex: 1,
    },
    stepName: {
        fontSize: 16,
        fontWeight: 500,
        color: theme.colors.text,
    },
    stepNameDone: {
        color: theme.colors.secondaryText,
        textDecorationLine: 'line-through',
    },
    stepProduct: {
        fontSize: 13,
        color: theme.colors.secondaryText,
    },
    emptyText: {
        fontSize: 15,
        color: theme.colors.secondaryText,
    },
    linkText: {
        fontWeight: 600,
        color: theme.colors.primary,
    },
});

export default createStyles;
