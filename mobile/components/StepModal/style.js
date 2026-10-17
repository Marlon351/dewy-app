import { StyleSheet } from "react-native";

const createStyles = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: theme.colors.background,
    },
    header: {
        height: 56,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: 17,
        fontWeight: 600,
        color: theme.colors.text,
    },
    headerButtonText: {
        fontSize: 16,
        color: theme.colors.primary,
    },
    saveText: {
        fontWeight: 600,
    },
    disabledText: {
        color: theme.colors.secondaryText,
    },
    sectionHeader: {
        marginTop: 24,
        marginBottom: 8,
        marginLeft: 4,
        fontSize: 13,
        color: theme.colors.secondaryText,
    },
    chipsContainer: {
        marginTop: 12,
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    chip: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: theme.colors.border,
        backgroundColor: theme.colors.card,
    },
    chipText: {
        fontSize: 14,
        color: theme.colors.text,
    },
    chipTextSelected: {
        fontWeight: 600,
    },
    daysContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    day: {
        height: 40,
        width: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: theme.colors.border,
        backgroundColor: theme.colors.card,
    },
    dayText: {
        fontSize: 15,
        fontWeight: 600,
        color: theme.colors.text,
    },
    dayTextSelected: {
        color: "#FFFFFF",
    },
    daysHint: {
        marginTop: 10,
        marginLeft: 4,
        fontSize: 13,
        color: theme.colors.secondaryText,
    },
    deleteButtonContainer: {
        marginTop: 40,
    },
});

export default createStyles;
