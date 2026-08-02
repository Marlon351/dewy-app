import React from "react";
import { Pressable, SafeAreaView, Text, View } from "react-native";
import globalStyle from "../../assets/styles/globalStyle";
import BackButton from "../../components/BackButton/BackButton";
import styles from "./style";
import AuthenticationInput from "../../components/AuthenticationInput/AuthenticationInput";
import MenuButton from "../../components/MenuButton/MenuButton";
import { Routes } from "../../navigation/Routes";
import { useState } from "react";
import api from "../../api/user";


const Register = ({navigation}) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [emailAddress, setEmailAddress] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");


    const handleRegister = async () => {
        setError("");
        if (firstName == "" || lastName == "" || emailAddress == "" || password == "" || confirmPassword == ""){
            setError("Fill out all fields!");
        }
        else {
            const response = await api.register(firstName, lastName, emailAddress, password, confirmPassword);
            console.log(response.responseInJSON);
            if (response.statusCode == 201){
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
    }

    return (
        <SafeAreaView style={[globalStyle.flex, globalStyle.backgroundWhite]}>
            <View style={globalStyle.horizontalMargin}>
                <BackButton onPress={() => navigation.goBack()}/>
                <Text style={styles.welcomeText}>Welcome to Fello! Create your Account!</Text>
                    <View style={styles.inputContainer}>
                        <AuthenticationInput value={firstName} placeholder={"First Name"} placeholderTextColor={"#DADADA"} onChangeText={(text) => setFirstName(text)}/>
                        <AuthenticationInput value={lastName} placeholder={"Last Name"} placeholderTextColor={"#DADADA"} onChangeText={(text) => setLastName(text)}/>
                        <AuthenticationInput value={emailAddress} keyboardType={"email-address"} placeholder={"Email"} placeholderTextColor={"#DADADA"} onChangeText={(text) => setEmailAddress(text)}/>
                        <AuthenticationInput value={password} secureTextEntry={true} keyboardType={"password"} placeholder={"Password"} placeholderTextColor={"#DADADA"} onChangeText={(text) => setPassword(text)}/>
                        <AuthenticationInput value={confirmPassword} secureTextEntry={true} keyboardType={"password"} placeholder={"Confirm Password"} placeholderTextColor={"#DADADA"} onChangeText={(text) => setConfirmPassword(text)}/>
                        <View style={styles.errorContainer}>
                            <Text style={styles.errorText}>{error}</Text>
                        </View>
                        <MenuButton label={"Agree and Register"} color={globalStyle.themeColor} onPress={() => handleRegister()}/>
                    </View>
            </View>
        </SafeAreaView>
    )
}

export default Register;