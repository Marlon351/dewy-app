import { StyleSheet } from "react-native";

const createStyles = (theme) => StyleSheet.create({
    field: {
        width: '100%',
        gap: 8,
    },
    label: {
        fontSize: 14,
        fontWeight: 600,
        color: theme.colors.text,
    },
    inputContainer: {
        width: '100%',
        height: 56,
        backgroundColor: theme.colors.card,
        borderWidth: 1,
        borderRadius: 12,
        borderColor: theme.colors.border,
        paddingHorizontal: 16,
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