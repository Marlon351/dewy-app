import { StyleSheet } from "react-native";


const createStyles = (theme) => StyleSheet.create({
    headerContainer: {
        marginTop: 20,
    },
    headerIntroText: {
        color: theme.colors.text,
        fontSize: 16,
        fontWeight: 400,
        lineHeight: 19,
    },
    headerFirstNameText: {
        fontSize: 24,
        fontWeight: 600,
        lineHeight: 29,
        color: theme.colors.primary,
    },
});

export default createStyles;