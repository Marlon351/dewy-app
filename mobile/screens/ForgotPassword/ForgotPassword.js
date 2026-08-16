import React, { useState } from "react";
import { SafeAreaView, Text, View } from "react-native";
import globalStyle from "../../assets/styles/globalStyle";
import BackButton from "../../components/BackButton/BackButton";
import styles from "./style";
import AuthenticationInput from "../../components/AuthenticationInput/AuthenticationInput";
import MenuButton from "../../components/MenuButton/MenuButton";

const ForgotPassword = ({navigation}) => {
    const [emailAddress, setEmailAddress] = useState("");
    return (
        <SafeAreaView style={[globalStyle.flex, globalStyle.backgroundWhite]}>
            <View style={globalStyle.horizontalMargin}>
                <BackButton onPress={() => navigation.goBack()}/>
                <View style={styles.confirmItsYouTextContainer}>
                    <Text style={styles.confirmItsYouText}>Confirm it's you.</Text>
                    <Text style={styles.confirmItsYouSubHeader}>Please verify your email to continue.</Text>
                </View>
                <View style={styles.inputContainer}>
                    <AuthenticationInput value={emailAddress} keyboardType={"email-address"} placeholder={"Enter your email"} placeholderTextColor={"#DADADA"} onChangeText={(text) => setEmailAddress(text)}/>
                    <MenuButton label={"Continue"} color={globalStyle.themeColor} onPress={() => {}} />
                </View>
            </View>
        </SafeAreaView>
    )
}

export default ForgotPassword;