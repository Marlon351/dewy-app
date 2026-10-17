import { StyleSheet } from "react-native";

const createStyles = (theme) => StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 4,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: theme.colors.border,
        backgroundColor: theme.colors.card,
    },
    option: {
        flex: 1,
        height: 36,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 6,
        borderRadius: 8,
    },
    emoji: {
        fontSize: 15,
    },
    optionText: {
        fontSize: 15,
        fontWeight: 'bold',
    },
});

export default createStyles;
