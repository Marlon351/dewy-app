import { StyleSheet } from "react-native";
import globalStyle from "../../assets/styles/globalStyle";

const styles = StyleSheet.create({
    welcomeText: {
        marginTop: 33,
        fontSize: 30,
        fontWeight: 'bold',
        color: globalStyle.themeColor,
        width: 300,
    },
    inputContainer: {
        marginTop: 57,
        gap: 20,
    },
    loginContainer: {
        marginTop: 83,
        justifyContent: 'center',
        flexDirection: 'row',
    },
    loginText: {
        fontSize: 15,
        color: globalStyle.themeColor,
    },
    loginButton: {
        fontSize: 15,
        color: '#35C2C1',
    },
    errorContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        fontSize: 15,
        color: '#FF0000',
    },
});

export default styles;