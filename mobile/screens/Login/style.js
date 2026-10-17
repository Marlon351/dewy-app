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
    welcomeText: {
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
    inputAndForgotPasswordContainer: {
        marginTop: 32,
    },
    inputContainer: {
        gap: 18,
    },
    forgotPasswordText: {
        marginTop: 10,
        color: theme.colors.primary,
        fontWeight: 600,
    },
    forgotPasswordButtonContainer: {
        alignItems: 'flex-end',
    },
    menuButtonsContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 68,
    },
    registerContainer: {
        marginTop: 28,
        justifyContent: 'center',
        flexDirection: 'row',
    },
    registerText: {
        fontSize: 15,
        color: theme.colors.secondaryText,
    },
    registerButton: {
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