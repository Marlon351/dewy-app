import { StyleSheet } from "react-native";
import globalStyle from "../../assets/styles/globalStyle";

const styles = StyleSheet.create({
    confirmItsYouTextContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    confirmItsYouText: {
        marginTop: 33,
        fontSize: 30,
        fontWeight: 'bold',
        color: globalStyle.themeColor,
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
});

export default styles;