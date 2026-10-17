import { StyleSheet } from "react-native";

const createStyles = (theme) => StyleSheet.create({
    profileContainer: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    avatar: {
        height: 56,
        width: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.primary,
    },
    avatarText: {
        fontSize: 22,
        fontWeight: 600,
        color: "#FFFFFF",
    },
    profileTextContainer: {
        flex: 1,
        gap: 2,
    },
    nameText: {
        fontSize: 20,
        fontWeight: 600,
        color: theme.colors.text,
    },
    emailText: {
        fontSize: 14,
        color: theme.colors.secondaryText,
    },
    sectionHeader: {
        marginTop: 28,
        marginBottom: 8,
        marginLeft: 16,
        fontSize: 13,
        color: theme.colors.secondaryText,
    },
    card: {
        borderRadius: 12,
        borderWidth: 1,
        borderColor: theme.colors.border,
        backgroundColor: theme.colors.card,
    },
    accountCard: {
        marginTop: 20,
    },
    row: {
        height: 56,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 14,
    },
    rowIconContainer: {
        height: 32,
        width: 32,
        borderRadius: 9,
        justifyContent: 'center',
        alignItems: 'center',
    },
    rowLabel: {
        flex: 1,
        fontSize: 16,
    },
    statsRow: {
        marginTop: 16,
        flexDirection: 'row',
        gap: 10,
    },
    statPill: {
        paddingVertical: 8,
        paddingHorizontal: 14,
        borderRadius: 16,
    },
    statPillText: {
        fontSize: 14,
        fontWeight: 'bold',
    },
});

export default createStyles;
