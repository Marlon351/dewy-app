import { StyleSheet } from "react-native";

const createStyles = (theme) => StyleSheet.create({
    inputContainer: {
        width: '100%',
        height: 56,
        backgroundColor: theme.colors.card,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: theme.colors.border,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',

    },
    input: {
        color: theme.colors.text,
        fontSize: 15,
        fontWeight: 'medium',
        flex: 1,
    },
    eyeButton: {
        marginLeft: 20,
    },
});

export default createStyles;