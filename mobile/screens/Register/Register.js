import React from "react";
import { Image, Linking, Pressable, ScrollView, Text, View } from "react-native";
import BackButton from "../../components/BackButton/BackButton";
import createStyles from "./style";
import AuthenticationInput from "../../components/AuthenticationInput/AuthenticationInput";
import MenuButton from "../../components/MenuButton/MenuButton";
import { Routes } from "../../navigation/Routes";
import { useState } from "react";
import { useDispatch } from "react-redux";
import api from "../../api/user";
import { PRIVACY_POLICY_URL, TERMS_OF_SERVICE_URL } from "../../api/client";
import { logIn } from "../../redux/reducers/userSlice";
import { setToken } from "../../redux/reducers/tokenSlice";
import { loadRoutine } from "../../redux/routineSync";
import { useTheme } from "@react-navigation/native";
import AppScreen from "../../components/AppScreen/AppScreen";


const Register = ({ navigation }) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [emailAddress, setEmailAddress] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const theme = useTheme();
    const styles = createStyles(theme);


    const handleRegister = async () => {
        setError("");
        if (firstName == "" || lastName == "" || emailAddress == "" || password == "" || confirmPassword == "") {
            setError("Fill out all fields!");
        }
        else {
            const response = await api.register(firstName, lastName, emailAddress, password, confirmPassword);
            if (response.statusCode == 201) {
                // Log the new user straight in, the same way Login does
                dispatch(setToken(response.responseInJSON.token));
                dispatch(logIn(response.responseInJSON.data));
                dispatch(loadRoutine(response.responseInJSON.token));
                navigation.navigate(Routes.Main);
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
                    <Text style={styles.headerText}>Create your account</Text>
                    <Text style={styles.subHeaderText}>Start your routine with Dewy and track your progress every day.</Text>
                </View>
                <View style={styles.inputContainer}>
                    <View style={styles.nameRow}>
                        <View style={styles.nameField}>
                            <AuthenticationInput label={"First name"} value={firstName} autoComplete={"given-name"} placeholder={"Jane"} onChangeText={(text) => setFirstName(text)} />
                        </View>
                        <View style={styles.nameField}>
                            <AuthenticationInput label={"Last name"} value={lastName} autoComplete={"family-name"} placeholder={"Doe"} onChangeText={(text) => setLastName(text)} />
                        </View>
                    </View>
                    <AuthenticationInput label={"Email"} value={emailAddress} keyboardType={"email-address"} autoCapitalize={"none"} autoComplete={"email"} placeholder={"you@example.com"} onChangeText={(text) => setEmailAddress(text)} />
                    <AuthenticationInput label={"Password"} value={password} secureTextEntry={true} autoComplete={"new-password"} placeholder={"At least 8 characters"} onChangeText={(text) => setPassword(text)} />
                    <AuthenticationInput label={"Confirm password"} value={confirmPassword} secureTextEntry={true} autoComplete={"new-password"} placeholder={"Re-enter your password"} onChangeText={(text) => setConfirmPassword(text)} />
                    {error !== "" &&
                        <View style={styles.errorContainer}>
                            <Text style={styles.errorText}>{error}</Text>
                        </View>
                    }
                    <View style={styles.buttonContainer}>
                        <MenuButton label={"Create Account"} color={theme.colors.primary} onPress={() => handleRegister()} />
                    </View>
                    <Text style={styles.legalText}>
                        By creating an account, you agree to our <Text style={styles.legalLink} onPress={() => Linking.openURL(TERMS_OF_SERVICE_URL)}>Terms of Service</Text> and <Text style={styles.legalLink} onPress={() => Linking.openURL(PRIVACY_POLICY_URL)}>Privacy Policy</Text>.
                    </Text>
                </View>
                <View style={styles.loginContainer}>
                    <Text style={styles.loginText}>Already have an account? </Text>
                    <Pressable hitSlop={8} onPress={() => navigation.navigate(Routes.Login)}>
                        <Text style={styles.loginButton}>Log in</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </AppScreen>
    )
}

export default Register;
