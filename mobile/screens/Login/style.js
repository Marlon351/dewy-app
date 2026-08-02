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
    inputAndForgotPasswordContainer: {
        marginTop: 57,
    },
    inputContainer: {
        gap: 20,        
    },
    forgotPasswordText: {
        marginTop: 5,
        color: '#6A707C',
        fontWeight: 'semibold',
    },
    forgotPasswordButtonContainer: {
        alignItems: 'flex-end',
    },
    menuButtonsContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 68,
    },
    registerContainer: {
        marginTop: 83,
        justifyContent: 'center',
        flexDirection: 'row',
    },
    registerText: {
        fontSize: 15,
        color: globalStyle.themeColor,
    },
    registerButton: {
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