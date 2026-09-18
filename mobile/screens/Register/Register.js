import React from "react";
import { Pressable, Text, View } from "react-native";
import BackButton from "../../components/BackButton/BackButton";
import createStyles from "./style";
import AuthenticationInput from "../../components/AuthenticationInput/AuthenticationInput";
import MenuButton from "../../components/MenuButton/MenuButton";
import { Routes } from "../../navigation/Routes";
import { useState } from "react";
import api from "../../api/user";
import { useTheme } from "@react-navigation/native";
import AppScreen from "../../components/AppScreen/AppScreen";


const Register = ({ navigation }) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [emailAddress, setEmailAddress] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const theme = useTheme();
    const styles = createStyles(theme);


    const handleRegister = async () => {
        setError("");
        if (firstName == "" || lastName == "" || emailAddress == "" || password == "" || confirmPassword == "") {
            setError("Fill out all fields!");
        }
        else {
            const response = await api.register(firstName, lastName, emailAddress, password, confirmPassword);
            console.log(response.responseInJSON);
            if (response.statusCode == 201) {
                setFirstName("");
                setLastName("");
                setEmailAddress("");
                setPassword("");
                setConfirmPassword("");
                setError("");
            }
            else {
                setError(response.responseInJSON.message);
            }
        }
    };

    return (
        <AppScreen>
            <BackButton onPress={() => navigation.goBack()} />
            <Text style={styles.welcomeText}>Welcome to APP NAME! Create your Account!</Text>
            <View style={styles.inputContainer}>
                <AuthenticationInput value={firstName} placeholder={"First Name"} onChangeText={(text) => setFirstName(text)} />
                <AuthenticationInput value={lastName} placeholder={"Last Name"} onChangeText={(text) => setLastName(text)} />
                <AuthenticationInput value={emailAddress} keyboardType={"email-address"} placeholder={"Email"} onChangeText={(text) => setEmailAddress(text)} />
                <AuthenticationInput value={password} secureTextEntry={true} keyboardType={"password"} placeholder={"Password"} onChangeText={(text) => setPassword(text)} />
                <AuthenticationInput value={confirmPassword} secureTextEntry={true} keyboardType={"password"} placeholder={"Confirm Password"} onChangeText={(text) => setConfirmPassword(text)} />
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{error}</Text>
                </View>
                <MenuButton label={"Agree and Register"} color={theme.colors.primary} onPress={() => handleRegister()} />
            </View>
        </AppScreen>
    )
}

export default Register;