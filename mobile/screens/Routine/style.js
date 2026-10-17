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
    subtitle: {
        marginTop: 4,
        fontSize: 15,
        color: theme.colors.secondaryText,
    },
    segmentedControlContainer: {
        marginTop: 20,
    },
    summaryCard: {
        marginTop: 20,
        marginBottom: 16,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 14,
        borderRadius: 16,
    },
    summaryEmoji: {
        fontSize: 32,
    },
    summaryTextContainer: {
        flex: 1,
        gap: 2,
    },
    summaryTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    summaryText: {
        fontSize: 14,
        color: theme.colors.text,
    },
    stepsContainer: {
        gap: 10,
    },
    stepCard: {
        padding: 14,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 14,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: theme.colors.border,
        backgroundColor: theme.colors.card,
    },
    stepEmojiContainer: {
        height: 48,
        width: 48,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
    },
    stepEmoji: {
        fontSize: 24,
    },
    stepNumberText: {
        fontSize: 11,
        fontWeight: 'bold',
        letterSpacing: 0.5,
    },
    stepTextContainer: {
        flex: 1,
        gap: 2,
    },
    stepName: {
        fontSize: 16,
        fontWeight: 600,
        color: theme.colors.text,
    },
    stepProduct: {
        fontSize: 14,
        color: theme.colors.text,
    },
    stepDays: {
        fontSize: 13,
        color: theme.colors.secondaryText,
    },
    reorderContainer: {
        gap: 12,
    },
    emptyCard: {
        padding: 20,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: theme.colors.border,
        backgroundColor: theme.colors.card,
    },
    emptyText: {
        fontSize: 15,
        textAlign: 'center',
        color: theme.colors.secondaryText,
    },
    addButtonContainer: {
        marginTop: 20,
    },
});

export default createStyles;
