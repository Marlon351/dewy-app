import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import BackButton from "../../components/BackButton/BackButton";
import createStyles from "./style";
import AuthenticationInput from "../../components/AuthenticationInput/AuthenticationInput";
import MenuButton from "../../components/MenuButton/MenuButton";
import { Routes } from "../../navigation/Routes";
import api from "../../api/user";
import { useDispatch } from "react-redux";
import { logIn } from "../../redux/reducers/userSlice";
import { setToken } from "../../redux/reducers/tokenSlice";
import { useTheme } from "@react-navigation/native";
import AppScreen from "../../components/AppScreen/AppScreen";

const Login = ({ navigation }) => {
    const [emailAddress, setEmailAddress] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const theme = useTheme()
    const styles = createStyles(theme);

    const handleLogin = async () => {
        setError("");
        if (emailAddress == "" || password == "") {
            setError("Fill out all fields!");
        }
        else {
            const response = await api.login(emailAddress, password);
            if (response.statusCode == 200) {
                setEmailAddress("");
                setPassword("");
                //Store the token securely
                dispatch(setToken(response.responseInJSON.token));
                dispatch(logIn(response.responseInJSON.data));
                navigation.navigate(Routes.Main)
            }
            else {
                setError(response.responseInJSON.message);
            }
        }
    };

    return (
        <AppScreen>
            <BackButton onPress={() => navigation.goBack()} />
            <Text style={styles.welcomeText}>Welcome Back! Glad to see you, Again!</Text>
            <View style={styles.inputAndForgotPasswordContainer}>
                <View style={styles.inputContainer}>
                    <AuthenticationInput value={emailAddress} keyboardType={"email-address"} placeholder={"Enter your email"} onChangeText={(text) => setEmailAddress(text)} />
                    <View style={styles.forgotPasswordButtonContainer}>
                        <AuthenticationInput value={password} secureTextEntry={true} keyboardType={"password"} placeholder={"Enter your password"} onChangeText={(text) => setPassword(text)} />
                        <Pressable onPress={() => navigation.navigate(Routes.ForgotPassword)}>
                            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                        </Pressable>
                    </View>
                    <View style={styles.errorContainer}>
                        <Text style={styles.errorText}>{error}</Text>
                    </View>
                    <MenuButton label={"Login"} color={theme.colors.primary} onPress={() => handleLogin()} />
                </View>
            </View>
        </AppScreen>
    )
}

export default Login;