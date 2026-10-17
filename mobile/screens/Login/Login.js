import React, { useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import BackButton from "../../components/BackButton/BackButton";
import createStyles from "./style";
import AuthenticationInput from "../../components/AuthenticationInput/AuthenticationInput";
import MenuButton from "../../components/MenuButton/MenuButton";
import { Routes } from "../../navigation/Routes";
import api from "../../api/user";
import { useDispatch } from "react-redux";
import { logIn } from "../../redux/reducers/userSlice";
import { setToken } from "../../redux/reducers/tokenSlice";
import { loadRoutine } from "../../redux/routineSync";
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
                dispatch(loadRoutine(response.responseInJSON.token));
                navigation.navigate(Routes.Main)
            }
            else {
                setError(response.responseInJSON.message);
            }
        }
    };

    return (
        <AppScreen>
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" automaticallyAdjustKeyboardInsets={true} contentContainerStyle={styles.scrollContent}>
                <BackButton onPress={() => navigation.goBack()} />
                <View style={styles.headerContainer}>
                    <Image source={require("../../assets/images/dewy-logo.png")} style={styles.logo} />
                    <Text style={styles.welcomeText}>Welcome back</Text>
                    <Text style={styles.subHeaderText}>Log in to pick up your routine where you left off.</Text>
                </View>
                <View style={styles.inputAndForgotPasswordContainer}>
                    <View style={styles.inputContainer}>
                        <AuthenticationInput label={"Email"} value={emailAddress} keyboardType={"email-address"} autoCapitalize={"none"} autoComplete={"email"} placeholder={"you@example.com"} onChangeText={(text) => setEmailAddress(text)} />
                        <View style={styles.forgotPasswordButtonContainer}>
                            <AuthenticationInput label={"Password"} value={password} secureTextEntry={true} autoComplete={"current-password"} placeholder={"Enter your password"} onChangeText={(text) => setPassword(text)} />
                            <Pressable hitSlop={8} onPress={() => navigation.navigate(Routes.ForgotPassword)}>
                                <Text style={styles.forgotPasswordText}>Forgot password?</Text>
                            </Pressable>
                        </View>
                        {error !== "" &&
                            <View style={styles.errorContainer}>
                                <Text style={styles.errorText}>{error}</Text>
                            </View>
                        }
                        <MenuButton label={"Log In"} color={theme.colors.primary} onPress={() => handleLogin()} />
                    </View>
                </View>
                <View style={styles.registerContainer}>
                    <Text style={styles.registerText}>New to Dewy? </Text>
                    <Pressable hitSlop={8} onPress={() => navigation.navigate(Routes.Register)}>
                        <Text style={styles.registerButton}>Create an account</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </AppScreen>
    )
}

export default Login;