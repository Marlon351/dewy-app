import { StyleSheet } from "react-native";

const createStyles = (theme) => StyleSheet.create({
    scrollContent: {
        paddingBottom: 40,
    },
    headerText: {
        marginTop: 33,
        fontSize: 30,
        fontWeight: 'bold',
        color: theme.colors.primary,
    },
    avatarContainer: {
        marginTop: 24,
        alignItems: 'center',
    },
    avatar: {
        height: 80,
        width: 80,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.primary,
    },
    avatarText: {
        fontSize: 32,
        fontWeight: 600,
        color: "#FFFFFF",
    },
    sectionHeader: {
        marginTop: 28,
        marginBottom: 8,
        marginLeft: 16,
        fontSize: 13,
        color: theme.colors.secondaryText,
    },
    inputContainer: {
        gap: 20,
    },
    errorContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        fontSize: 15,
        color: theme.colors.error,
    },
});

export default createStyles;
