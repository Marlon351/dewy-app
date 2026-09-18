import { StyleSheet } from "react-native";

const createStyles = (theme) => StyleSheet.create({
    buttonContainer: {
        height: 41,
        width: 41,
        borderWidth: 1,
        borderRadius: 12,
        borderColor: theme.colors.border,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default createStyles;
