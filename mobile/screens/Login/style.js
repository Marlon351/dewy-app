import { StyleSheet } from "react-native";

const createStyles = (theme) => StyleSheet.create({
    welcomeText: {
        marginTop: 33,
        fontSize: 30,
        fontWeight: 'bold',
        color: theme.colors.primary,
        width: 300,
    },
    inputAndForgotPasswordContainer: {
        marginTop: 57,
    },
    inputContainer: {
        gap: 20,        
    },
    forgotPasswordText: {
        marginTop: 5,
        color: theme.colors.primary,
        fontWeight: 'semibold',
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
        marginTop: 83,
        justifyContent: 'center',
        flexDirection: 'row',
    },
    registerText: {
        fontSize: 15,
        color: theme.colors.primary,
    },
    registerButton: {
        fontSize: 15,
        color: theme.colors.primary,
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