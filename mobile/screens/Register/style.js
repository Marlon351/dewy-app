import { StyleSheet } from "react-native";

const createStyles = (theme) => StyleSheet.create({
    welcomeText: {
        marginTop: 33,
        fontSize: 30,
        fontWeight: 'bold',
        color: theme.colors.primary,
        width: 300,
    },
    inputContainer: {
        marginTop: 57,
        gap: 20,
    },
    loginContainer: {
        marginTop: 83,
        justifyContent: 'center',
        flexDirection: 'row',
    },
    loginText: {
        fontSize: 15,
        color: theme.colors.primary,
    },
    loginButton: {
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