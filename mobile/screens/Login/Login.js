import React, { useState } from "react";
import { Pressable, SafeAreaView, Text, View } from "react-native";
import globalStyle from "../../assets/styles/globalStyle";
import BackButton from "../../components/BackButton/BackButton";
import styles from "./style";
import AuthenticationInput from "../../components/AuthenticationInput/AuthenticationInput";
import MenuButton from "../../components/MenuButton/MenuButton";
import { Routes } from "../../navigation/Routes";
import api from "../../api/user";
import { useDispatch } from "react-redux";
import { logIn } from "../../redux/reducers/User";

const Login = ({navigation}) => {
    const [emailAddress, setEmailAddress] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const dispatch = useDispatch();

    const handleLogin = async () => {
        setError("");
        if (emailAddress == "" || password == ""){
            setError("Fill out all fields!");
        }
        else {
            const response = await api.login(emailAddress, password);
            if (response.statusCode == 200){
                setEmailAddress("");
                setPassword("");
                dispatch(logIn(response.responseInJSON.data));
                navigation.navigate(Routes.Main)
            }
            else {
                setError(response.responseInJSON.message);
            }
        }
    }

    return (
        <SafeAreaView style={[globalStyle.flex, globalStyle.backgroundWhite]}>
            <View style={globalStyle.horizontalMargin}>
                <BackButton onPress={() => navigation.goBack()}/>
                <Text style={styles.welcomeText}>Welcome Back! Glad to see you, Again!</Text>
                <View style={styles.inputAndForgotPasswordContainer}>
                    <View style={styles.inputContainer}>
                        <AuthenticationInput value={emailAddress} keyboardType={"email-address"} placeholder={"Enter your email"} placeholderTextColor={"#DADADA"} onChangeText={(text) => setEmailAddress(text)}/>
                        <View style={styles.forgotPasswordButtonContainer}>
                            <AuthenticationInput value={password} secureTextEntry={true} keyboardType={"password"} placeholder={"Enter your password"} placeholderTextColor={"#DADADA"} onChangeText={(text) => setPassword(text)}/>
                            <Pressable onPress={() => navigation.navigate(Routes.ForgotPassword)}>
                                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                            </Pressable>
                        </View>
                        <View style={styles.errorContainer}>
                            <Text style={styles.errorText}>{error}</Text>
                        </View>
                        <MenuButton label={"Login"} color={globalStyle.themeColor} onPress={() => handleLogin()}/>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Login;