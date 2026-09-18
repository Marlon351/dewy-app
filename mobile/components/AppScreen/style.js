import { StyleSheet } from "react-native";

const createStyles = (theme) => StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    safeAreaContainer: {
        marginHorizontal: 20,
    },
});

export default createStyles;