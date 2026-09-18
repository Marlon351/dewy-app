import { StyleSheet } from "react-native";

const createStyles = (theme) => StyleSheet.create({
    checkYourEmailContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkYourEmailText: {
        marginTop: 33,
        fontSize: 30,
        fontWeight: 'bold',
        color: theme.colors.primary,
    },
    checkYourEmailSubHeader: {
        marginTop: 10,
        fontSize: 15,
        color: '#6A707C',
    },
    emailAddressText: {
        color: theme.colors.text,
        fontWeight: 600,
    },
    inputContainer: {
        marginTop: 57,
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