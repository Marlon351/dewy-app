import React, { useRef, useState } from "react";
import { Text, View } from "react-native";
import BackButton from "../../components/BackButton/BackButton";
import createStyles from "./style";
import { useDispatch, useSelector } from "react-redux";
import { OtpInput } from "react-native-otp-entry";
import MenuButton from "../../components/MenuButton/MenuButton";
import api from "../../api/user";
import { logIn, resetPassword, resetToInitialState } from "../../redux/reducers/userSlice";
import { Routes } from "../../navigation/Routes";
import { useTheme } from "@react-navigation/native";
import AppScreen from "../../components/AppScreen/AppScreen";

const EmailVerification = ({navigation}) => {
    const [code, setCode] = useState("");
    const [error, setError] = useState("");
    const theme = useTheme();
    const styles = createStyles(theme);
    const dispatch = useDispatch();
    const user = useSelector(state => state.persist.user);
    const otpRef = useRef(null)

    const handleVerifyEmail = async () => {
        setError("");
        setCode(code.toUpperCase());
        if (code.length != 5){
            setError("Fill out all fields!");
        }
        else {
            const response = await api.verifyEmail(user.emailAddress, code);
            if (response.statusCode == 200){
                setCode("");
                dispatch(resetPassword(response.responseInJSON));
                navigation.navigate(Routes.ResetPassword);
            }
            else {
                setError(response.responseInJSON.message);
            }
        }
    };

    return (
        <AppScreen>
            <BackButton onPress={() => navigation.goBack()}/>
            <View style={styles.checkYourEmailContainer} >
                <Text style={styles.checkYourEmailText}>Check your email.</Text>
                <Text style={styles.checkYourEmailSubHeader}>Please enter the 5 letter code sent to</Text>
                <Text style={styles.emailAddressText}>{user.emailAddress}</Text>
            </View>
            <View style={styles.inputContainer}>
                <OtpInput numberOfDigits={5} ref={otpRef} type={"alpha"} hideStick={true} focusColor={theme.colors.primary} onTextChange={(text) => setCode(text)} textInputProps={{autoCapitalize: 'characters'}}/>
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{error}</Text>
                </View>
                <MenuButton label={"Continue"} color={theme.colors.primary} onPress={() => handleVerifyEmail()} />
            </View>
        </AppScreen>
    );
};

export default EmailVerification;