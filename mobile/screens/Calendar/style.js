import { StyleSheet } from "react-native";

const createStyles = (theme) => StyleSheet.create({
    scrollContent: {
        paddingBottom: 30,
    },
    title: {
        marginTop: 20,
        fontSize: 28,
        fontWeight: 'bold',
        color: theme.colors.text,
    },
    statsContainer: {
        marginTop: 20,
        flexDirection: 'row',
        gap: 10,
    },
    statTile: {
        flex: 1,
        paddingVertical: 14,
        alignItems: 'center',
        gap: 2,
        borderRadius: 16,
    },
    statEmoji: {
        fontSize: 24,
    },
    statValue: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    monthMessage: {
        marginTop: 12,
        marginBottom: 16,
        fontSize: 15,
        fontWeight: 500,
        textAlign: 'center',
        color: theme.colors.text,
    },
    statLabel: {
        fontSize: 12,
        color: theme.colors.secondaryText,
    },
    card: {
        padding: 16,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: theme.colors.border,
        backgroundColor: theme.colors.card,
    },
    monthHeader: {
        marginBottom: 12,
        paddingHorizontal: 4,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    monthText: {
        fontSize: 17,
        fontWeight: 600,
        color: theme.colors.text,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    dayCell: {
        width: `${100 / 7}%`,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
    },
    weekdayText: {
        fontSize: 12,
        color: theme.colors.secondaryText,
    },
    dayCircle: {
        height: 40,
        width: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: 'transparent',
    },
    daySelected: {
        borderColor: theme.colors.text,
    },
    dayInner: {
        height: 32,
        width: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'transparent',
    },
    dayComplete: {
        borderColor: theme.colors.primary,
        backgroundColor: theme.colors.primary,
    },
    dayPartial: {
        borderColor: theme.colors.primary,
    },
    dayText: {
        fontSize: 15,
        color: theme.colors.text,
    },
    dayTextToday: {
        fontWeight: 'bold',
        color: theme.colors.primary,
    },
    dayTextComplete: {
        color: "#FFFFFF",
    },
    dayTextFuture: {
        color: theme.colors.border,
    },
    legend: {
        marginTop: 8,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 6,
    },
    legendDot: {
        height: 12,
        width: 12,
        borderRadius: 6,
        borderWidth: 2,
        marginLeft: 10,
    },
    legendText: {
        fontSize: 13,
        color: theme.colors.secondaryText,
    },
    sectionHeader: {
        marginTop: 28,
        marginBottom: 8,
        marginLeft: 16,
        fontSize: 13,
        color: theme.colors.secondaryText,
    },
    periodRow: {
        paddingVertical: 6,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    periodEmojiContainer: {
        height: 36,
        width: 36,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    periodEmoji: {
        fontSize: 18,
    },
    periodLabel: {
        flex: 1,
        fontSize: 16,
        fontWeight: 500,
        color: theme.colors.text,
    },
    periodStatusComplete: {
        fontWeight: 'bold',
    },
    periodStatus: {
        fontSize: 15,
        color: theme.colors.secondaryText,
    },
    divider: {
        height: 1,
        marginVertical: 12,
        backgroundColor: theme.colors.border,
    },
    checkInTitle: {
        fontSize: 16,
        fontWeight: 600,
        color: theme.colors.text,
    },
    ratingContainer: {
        marginTop: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    ratingOption: {
        alignItems: 'center',
        gap: 6,
    },
    ratingButton: {
        height: 50,
        width: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: theme.colors.border,
    },
    ratingButtonSelected: {
        borderWidth: 2,
        borderColor: theme.colors.pink,
        backgroundColor: theme.colors.pinkLight,
    },
    ratingEmoji: {
        fontSize: 24,
        opacity: 0.6,
    },
    ratingEmojiSelected: {
        fontSize: 28,
        opacity: 1,
    },
    ratingLabel: {
        fontSize: 11,
        color: theme.colors.secondaryText,
    },
    ratingLabelSelected: {
        fontWeight: 'bold',
        color: theme.colors.pink,
    },
    noteInput: {
        marginTop: 14,
        minHeight: 80,
        padding: 12,
        fontSize: 15,
        textAlignVertical: 'top',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: theme.colors.border,
        color: theme.colors.text,
        backgroundColor: theme.colors.background,
    },
});

export default createStyles;
