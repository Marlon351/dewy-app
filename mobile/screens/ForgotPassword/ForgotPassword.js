import React, { useState } from "react";
import { Text, View } from "react-native";
import BackButton from "../../components/BackButton/BackButton";
import createStyles from "./style";
import AuthenticationInput from "../../components/AuthenticationInput/AuthenticationInput";
import MenuButton from "../../components/MenuButton/MenuButton";
import api from "../../api/user";
import { Routes } from "../../navigation/Routes";
import { useDispatch } from "react-redux";
import { resetPassword } from "../../redux/reducers/userSlice";
import { useTheme } from "@react-navigation/native";
import AppScreen from "../../components/AppScreen/AppScreen";

const ForgotPassword = ({ navigation }) => {
    const [emailAddress, setEmailAddress] = useState("");
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const theme = useTheme();
    const styles = createStyles(theme);

    const handleForgotPassword = async () => {
        setError("");
        if (emailAddress == "") {
            setError("Fill out all fields!");
        }
        else {
            const response = await api.forgotPassword(emailAddress);
            if (response.statusCode == 200) {
                setEmailAddress("");
                dispatch(resetPassword({ emailAddress }));
                navigation.navigate(Routes.EmailVerification);
            }
            else {
                setError(response.responseInJSON.message);
            }
        }
    };

    return (
        <AppScreen>
            <BackButton onPress={() => navigation.goBack()} />
            <View style={styles.confirmItsYouTextContainer}>
                <Text style={styles.confirmItsYouText}>Confirm it's you.</Text>
                <Text style={styles.confirmItsYouSubHeader}>Please verify your email to continue.</Text>
            </View>
            <View style={styles.inputContainer}>
                <AuthenticationInput value={emailAddress} keyboardType={"email-address"} placeholder={"Enter your email"} onChangeText={(text) => setEmailAddress(text)} />
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{error}</Text>
                </View>
                <MenuButton label={"Continue"} color={theme.colors.primary} onPress={() => handleForgotPassword()} />
            </View>
        </AppScreen>
    );
}

export default ForgotPassword;