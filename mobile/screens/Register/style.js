import { StyleSheet } from "react-native";

const createStyles = (theme) => StyleSheet.create({
    scrollContent: {
        paddingBottom: 32,
    },
    headerContainer: {
        marginTop: 24,
    },
    logo: {
        height: 56,
        width: 56,
        borderRadius: 14,
    },
    headerText: {
        marginTop: 20,
        fontSize: 30,
        fontWeight: 'bold',
        letterSpacing: -0.3,
        color: theme.colors.text,
    },
    subHeaderText: {
        marginTop: 8,
        fontSize: 16,
        lineHeight: 22,
        color: theme.colors.secondaryText,
    },
    inputContainer: {
        marginTop: 32,
        gap: 18,
    },
    nameRow: {
        flexDirection: 'row',
        gap: 12,
    },
    nameField: {
        flex: 1,
    },
    buttonContainer: {
        marginTop: 8,
    },
    legalText: {
        fontSize: 13,
        lineHeight: 19,
        textAlign: 'center',
        color: theme.colors.secondaryText,
    },
    legalLink: {
        fontWeight: 600,
        color: theme.colors.primary,
    },
    loginContainer: {
        marginTop: 28,
        justifyContent: 'center',
        flexDirection: 'row',
    },
    loginText: {
        fontSize: 15,
        color: theme.colors.secondaryText,
    },
    loginButton: {
        fontSize: 15,
        fontWeight: 600,
        color: theme.colors.primary,
    },
    errorContainer: {
        padding: 12,
        borderRadius: 10,
        backgroundColor: theme.colors.errorLight,
    },
    errorText: {
        fontSize: 14,
        textAlign: 'center',
        color: theme.colors.error,
    },
});

export default createStyles;
