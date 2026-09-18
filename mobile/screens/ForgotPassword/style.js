import { StyleSheet } from "react-native";

const createStyles = (theme) => StyleSheet.create({
    confirmItsYouTextContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    confirmItsYouText: {
        marginTop: 33,
        fontSize: 30,
        fontWeight: 'bold',
        color: theme.colors.primary,
    },
    confirmItsYouSubHeader: {
        marginTop: 10,
        fontSize: 15,
        color: '#6A707C',
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