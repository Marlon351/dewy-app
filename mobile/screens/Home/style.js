import { StyleSheet } from "react-native";
import globalStyle from "../../assets/styles/globalStyle";

const styles = StyleSheet.create({
    headerContainer: {
        marginTop: 20,
    },
    headerIntroText: {
        fontSize: 16,
        fontWeight: 400,
        lineHeight: 19,
    },
    headerFirstNameText: {
        fontSize: 24,
        fontWeight: 600,
        lineHeight: 29,
        color: globalStyle.themeColor,
    },
});

export default styles;